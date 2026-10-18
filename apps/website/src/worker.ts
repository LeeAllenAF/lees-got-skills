import compiledIndex from './lab/generated/search-index.json';
import { LabAdmissionController } from './lab/admission';
import type { LabBudgetSnapshot } from './lab/admission-policy';
import {
  buildInferenceMessages,
  classifyInferenceError,
  labModel,
  maximumOutputTokens,
  validateModelOutput,
  type InferenceFailureKind,
  type LabUsage,
} from './lab/inference';
import { parseLabSearchIndex, retrieveDocument, retrieveEvidence, type LabRetrievalResult } from './lab/retrieval';

export { LabAdmissionController };

const index = parseLabSearchIndex(compiledIndex);
const maximumRequestBytes = 2_048;
const inferenceTimeoutMilliseconds = 12_000;
const budgetObjectName = 'corpus-lab-account-budget';

function jsonResponse(value: unknown, status = 200, headers?: HeadersInit) {
  return Response.json(value, {
    status,
    headers: {
      'Cache-Control': 'no-store',
      'Content-Security-Policy': "default-src 'none'; frame-ancestors 'none'",
      'X-Content-Type-Options': 'nosniff',
      ...headers,
    },
  });
}

function utcDay() {
  return new Date().toISOString().slice(0, 10);
}

function budgetController(env: Env) {
  return env.LAB_ADMISSION.getByName(budgetObjectName);
}

function clientMaterial(request: Request) {
  const address = request.headers.get('CF-Connecting-IP') ?? 'local-or-unknown';
  const userAgent = (request.headers.get('User-Agent') ?? 'unknown-agent').slice(0, 256);
  return `${address}\n${userAgent}`;
}

async function readBoundedJson(request: Request) {
  const declaredLength = Number(request.headers.get('Content-Length') ?? 0);
  if (declaredLength > maximumRequestBytes) throw new Error('Request body is too large.');
  if (!request.body) throw new Error('Request body is required.');

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let length = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      length += value.byteLength;
      if (length > maximumRequestBytes) throw new Error('Request body is too large.');
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }

  const bytes = new Uint8Array(length);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return JSON.parse(new TextDecoder().decode(bytes)) as unknown;
}

function validateQuestion(payload: unknown) {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    throw new Error('Request body must be a JSON object.');
  }
  const fields = Object.keys(payload);
  if (fields.length !== 1 || fields[0] !== 'question') {
    throw new Error('Request body must contain only a question field.');
  }
  const question = Reflect.get(payload, 'question');
  if (typeof question !== 'string' || !question.trim() || question.length > 500) {
    throw new Error('Question must contain between 1 and 500 characters.');
  }
  return question.trim();
}

function contextCharacters(retrieval: LabRetrievalResult) {
  return retrieval.passages.reduce((sum, passage) => sum + passage.text.length, 0);
}

function telemetry(
  retrieval: LabRetrievalResult,
  retrievalMilliseconds: number,
  budget: LabBudgetSnapshot | null,
  options: {
    inferenceCalls?: number;
    inferenceMilliseconds?: number | null;
    usage?: LabUsage | null;
  } = {},
) {
  return {
    retrievalMilliseconds,
    inferenceMilliseconds: options.inferenceMilliseconds ?? null,
    passageCount: retrieval.passages.length,
    contextCharacters: contextCharacters(retrieval),
    inferenceCalls: options.inferenceCalls ?? 0,
    model: labModel,
    usage: options.usage ?? null,
    budgetState: budget?.state ?? 'unavailable',
    quotaState: budget?.quotaState ?? 'unknown',
    budget,
  };
}

function inferenceFailureResponse(
  kind: InferenceFailureKind,
  question: string,
  retrieval: LabRetrievalResult,
  retrievalMilliseconds: number,
  inferenceMilliseconds: number,
  budget: LabBudgetSnapshot,
) {
  const responses = {
    quota_exhausted: {
      status: 429,
      message: `Cloudflare's daily free inference allocation is exhausted. New answers pause until ${budget.resetsAt}.`,
    },
    capacity_unavailable: {
      status: 503,
      message: 'The model is temporarily out of capacity. The retrieved evidence remains available to inspect.',
    },
    model_unavailable: {
      status: 503,
      message: 'This account cannot currently use the configured model. Model terms or eligibility may require attention.',
    },
    timeout: {
      status: 504,
      message: 'The single inference attempt timed out. It was not retried.',
    },
    inference_error: {
      status: 502,
      message: 'The single inference attempt failed. It was not retried or sent to another model.',
    },
  } as const;
  const response = responses[kind];
  return jsonResponse({
    status: kind,
    question,
    answer: null,
    message: response.message,
    retrieval,
    telemetry: telemetry(retrieval, retrievalMilliseconds, budget, {
      inferenceCalls: 1,
      inferenceMilliseconds,
    }),
  }, response.status);
}

async function handleAsk(request: Request, env: Env) {
  if (request.method !== 'POST') {
    return jsonResponse({ error: 'method_not_allowed', message: 'Use POST for lab questions.' }, 405);
  }
  if (!request.headers.get('Content-Type')?.toLowerCase().startsWith('application/json')) {
    return jsonResponse({ error: 'unsupported_media_type', message: 'Use application/json.' }, 415);
  }
  if (request.headers.get('Sec-Fetch-Site') === 'cross-site') {
    return jsonResponse({ error: 'cross_site_request', message: 'Cross-site lab requests are not accepted.' }, 403);
  }

  let question: string;
  try {
    question = validateQuestion(await readBoundedJson(request));
  } catch (error) {
    return jsonResponse({
      error: 'invalid_request',
      message: error instanceof Error ? error.message : 'The request could not be processed.',
    }, 400);
  }

  const retrievalStartedAt = performance.now();
  const retrieval = retrieveEvidence(question, index);
  const retrievalMilliseconds = Number((performance.now() - retrievalStartedAt).toFixed(2));
  const controller = budgetController(env);
  const day = utcDay();

  if (retrieval.status !== 'found') {
    let budget: LabBudgetSnapshot | null = null;
    try {
      budget = await controller.getStatus(day);
    } catch {
      console.error(JSON.stringify({ event: 'lab_budget_status_failed' }));
    }
    return jsonResponse({
      status: retrieval.status,
      question,
      answer: null,
      retrieval,
      telemetry: telemetry(retrieval, retrievalMilliseconds, budget),
    });
  }

  let prompt: ReturnType<typeof buildInferenceMessages>;
  try {
    prompt = buildInferenceMessages(question, retrieval);
  } catch {
    console.error(JSON.stringify({ event: 'lab_prompt_boundary_failed' }));
    return jsonResponse({
      status: 'inference_error',
      question,
      answer: null,
      message: 'The selected evidence could not fit the bounded model prompt.',
      retrieval,
      telemetry: telemetry(retrieval, retrievalMilliseconds, null),
    }, 503);
  }

  let budget: LabBudgetSnapshot;
  try {
    const admission = await controller.admit(day, clientMaterial(request));
    budget = admission;
    if (!admission.admitted) {
      const rateLimited = admission.state === 'rate_limited';
      return jsonResponse({
        status: rateLimited ? 'rate_limited' : 'budget_exhausted',
        question,
        answer: null,
        message: rateLimited
          ? 'This visitor has reached the current request limit. Try again after the displayed reset window.'
          : `The Corpus Lab inference budget is exhausted. New answers pause until ${admission.resetsAt}.`,
        retrieval,
        telemetry: telemetry(retrieval, retrievalMilliseconds, admission),
      }, 429, { 'Retry-After': rateLimited ? '600' : '3600' });
    }
  } catch {
    console.error(JSON.stringify({ event: 'lab_admission_failed' }));
    return jsonResponse({
      status: 'budget_unavailable',
      question,
      answer: null,
      message: 'Admission control is unavailable, so inference was not attempted.',
      retrieval,
      telemetry: telemetry(retrieval, retrievalMilliseconds, null),
    }, 503);
  }

  const inferenceStartedAt = performance.now();
  try {
    const output = await env.AI.run(labModel, {
      messages: prompt.messages,
      max_tokens: maximumOutputTokens,
      temperature: 0.2,
      top_p: 0.8,
      top_k: 20,
      seed: 1,
    }, {
      signal: AbortSignal.timeout(inferenceTimeoutMilliseconds),
      tags: ['feature:corpus-lab', 'model:llama-3.2-3b'],
    });
    const inferenceMilliseconds = Number((performance.now() - inferenceStartedAt).toFixed(2));
    const checked = validateModelOutput(output, prompt.allowedIds);
    budget = await controller.recordProviderState(day, 'observed_available');

    if (checked.insufficient) {
      return jsonResponse({
        status: 'insufficient',
        question,
        answer: null,
        message: 'The model declined because the selected evidence was not sufficient.',
        retrieval,
        telemetry: telemetry(retrieval, retrievalMilliseconds, budget, {
          inferenceCalls: 1,
          inferenceMilliseconds,
        }),
      });
    }

    return jsonResponse({
      status: 'found',
      question,
      answer: checked.answer,
      citations: checked.citations,
      retrieval,
      telemetry: telemetry(retrieval, retrievalMilliseconds, budget, {
        inferenceCalls: 1,
        inferenceMilliseconds,
        usage: checked.usage,
      }),
    });
  } catch (error) {
    const inferenceMilliseconds = Number((performance.now() - inferenceStartedAt).toFixed(2));
    const validationFailure = error instanceof Error && /model (?:output|cited|returned)|answer line|source citation|content boundary|tool call/i.test(error.message);
    const kind = validationFailure
      ? 'inference_error'
      : classifyInferenceError(error);
    if (kind === 'quota_exhausted') {
      try {
        budget = await controller.recordProviderState(day, 'exhausted');
      } catch {
        console.error(JSON.stringify({ event: 'lab_quota_state_write_failed' }));
      }
    }
    console.error(JSON.stringify({
      event: 'lab_inference_failed',
      kind,
      ...(validationFailure ? { reason: error.message } : {}),
    }));
    return inferenceFailureResponse(kind, question, retrieval, retrievalMilliseconds, inferenceMilliseconds, budget);
  }
}

function handleDocument(request: Request, documentId: string) {
  if (request.method !== 'GET') {
    return jsonResponse({ error: 'method_not_allowed', message: 'Use GET to inspect a document.' }, 405);
  }
  try {
    const startedAt = performance.now();
    const retrieval = retrieveDocument(decodeURIComponent(documentId), index);
    return jsonResponse({
      status: 'found',
      question: `inspect ${documentId.toUpperCase()}`,
      answer: null,
      message: `Loaded ${documentId.toUpperCase()} without inference.`,
      retrieval,
      telemetry: telemetry(retrieval, Number((performance.now() - startedAt).toFixed(2)), null),
    });
  } catch (error) {
    return jsonResponse({
      error: 'unknown_document',
      message: error instanceof Error ? error.message : 'The document could not be loaded.',
    }, 404);
  }
}

async function handleStatus(request: Request, env: Env) {
  if (request.method !== 'GET') {
    return jsonResponse({ error: 'method_not_allowed', message: 'Use GET for lab status.' }, 405);
  }
  try {
    const budget = await budgetController(env).getStatus(utcDay());
    return jsonResponse({
      inferenceAvailable: budget.state === 'available',
      budgetState: budget.state,
      quotaState: budget.quotaState,
      model: labModel,
      budget,
    });
  } catch {
    console.error(JSON.stringify({ event: 'lab_budget_status_failed' }));
    return jsonResponse({
      inferenceAvailable: false,
      budgetState: 'unavailable',
      quotaState: 'unknown',
      model: labModel,
      budget: null,
    }, 503);
  }
}

export default {
  async fetch(request, env): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname === '/api/lab/status') return handleStatus(request, env);
    if (url.pathname === '/api/lab/ask') return handleAsk(request, env);
    const documentMatch = url.pathname.match(/^\/api\/lab\/document\/([^/]+)$/);
    if (documentMatch?.[1]) return handleDocument(request, documentMatch[1]);
    if (url.pathname.startsWith('/api/lab/')) {
      return jsonResponse({ error: 'not_found', message: 'Unknown Corpus Lab endpoint.' }, 404);
    }
    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;
