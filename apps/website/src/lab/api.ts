import type { LabRetrievalResult } from './retrieval';
import type { BudgetState, LabBudgetSnapshot, QuotaState } from './admission-policy';
import type { LabUsage } from './inference';

export interface LabTelemetry {
  readonly retrievalMilliseconds: number;
  readonly inferenceMilliseconds: number | null;
  readonly passageCount: number;
  readonly contextCharacters: number;
  readonly inferenceCalls: number;
  readonly model: string | null;
  readonly usage: LabUsage | null;
  readonly budgetState: BudgetState;
  readonly quotaState: QuotaState;
  readonly budget: LabBudgetSnapshot | null;
}

export interface LabAskResponse {
  readonly status:
    | 'found'
    | 'ambiguous'
    | 'insufficient'
    | 'rate_limited'
    | 'budget_exhausted'
    | 'budget_unavailable'
    | 'quota_exhausted'
    | 'capacity_unavailable'
    | 'model_unavailable'
    | 'timeout'
    | 'inference_error';
  readonly question: string;
  readonly answer: string | null;
  readonly message?: string;
  readonly citations?: readonly string[];
  readonly retrieval: LabRetrievalResult;
  readonly telemetry: LabTelemetry;
}

export interface LabStatusResponse {
  readonly inferenceAvailable: boolean;
  readonly budgetState: BudgetState;
  readonly quotaState: QuotaState;
  readonly model: string;
  readonly budget: LabBudgetSnapshot | null;
}

export async function getCorpusLabStatus(signal?: AbortSignal) {
  const response = await fetch('/api/lab/status', {
    ...(signal ? { signal } : {}),
  });
  const payload = await response.json() as LabStatusResponse | { message?: string };
  if ('budgetState' in payload) return payload;
  throw new Error(payload.message ?? `Corpus Lab status failed with status ${response.status}.`);
}

export async function askCorpusLab(question: string, signal?: AbortSignal) {
  const response = await fetch('/api/lab/ask', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question }),
    ...(signal ? { signal } : {}),
  });
  const payload = await response.json() as LabAskResponse | { message?: string };
  if ('retrieval' in payload) return payload;
  throw new Error(payload.message ?? `Corpus Lab request failed with status ${response.status}.`);
}

export async function inspectCorpusDocument(documentId: string, signal?: AbortSignal) {
  const response = await fetch(`/api/lab/document/${encodeURIComponent(documentId)}`, {
    ...(signal ? { signal } : {}),
  });
  const payload = await response.json() as LabAskResponse | { message?: string };
  if ('retrieval' in payload) return payload;
  throw new Error(payload.message ?? `Corpus Lab request failed with status ${response.status}.`);
}
