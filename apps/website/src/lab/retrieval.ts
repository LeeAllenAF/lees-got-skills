type LabDocument = readonly [
  id: string,
  path: string,
  title: string,
  sourceReviewDate: string | null,
  sourceStatus: string,
  scope: readonly string[],
  related: readonly string[],
];

type LabSection = readonly [
  id: string,
  documentIndex: number,
  heading: string,
  text: string,
  lineStart: number,
  lineEnd: number,
  length: number,
];

export interface LabSearchIndex {
  readonly v: 2;
  readonly f: string;
  readonly a: Readonly<Record<string, string>>;
  readonly d: readonly LabDocument[];
  readonly s: readonly LabSection[];
  readonly p: Readonly<Record<string, readonly number[]>>;
}

export interface LabPassage {
  readonly documentId: string;
  readonly path: string;
  readonly title: string;
  readonly heading: string;
  readonly lineStart: number;
  lineEnd: number;
  text: string;
  readonly matchReason: string;
  readonly sourceReviewDate: string | null;
  readonly sourceStatus: string;
  readonly scope: readonly string[];
  truncated: boolean;
}

export interface LabRetrievalResult {
  status: 'found' | 'ambiguous' | 'insufficient';
  readonly indexFingerprint: string;
  passages: LabPassage[];
  readonly relatedDocumentIds: string[];
  readonly notes: string[];
  readonly inferenceCalls: 0;
  reason?: string;
  clarificationOptions?: string[];
  coverage?: {
    readonly matchedTerms: string[];
    readonly unmatchedTerms: string[];
    readonly interpretation: string;
  };
}

function isLabSearchIndex(value: unknown): value is LabSearchIndex {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
  const version = Reflect.get(value, 'v');
  const sourceFingerprint = Reflect.get(value, 'f');
  const aliases = Reflect.get(value, 'a');
  const documents = Reflect.get(value, 'd');
  const sections = Reflect.get(value, 's');
  const postings = Reflect.get(value, 'p');
  return version === 2
    && typeof sourceFingerprint === 'string'
    && Boolean(aliases) && typeof aliases === 'object' && !Array.isArray(aliases)
    && Array.isArray(documents)
    && Array.isArray(sections)
    && Boolean(postings) && typeof postings === 'object' && !Array.isArray(postings);
}

export function parseLabSearchIndex(value: unknown) {
  if (!isLabSearchIndex(value)) throw new Error('The compiled Corpus Lab index is invalid.');
  return value;
}

const maximumBytes = 12_000;
const stopWords = new Set('a an the and or but to of in on for with from by as at is are was were be being been it its this that these those i me my we our you your they their what which who when where why how do does did can could should would will shall about explain describe give tell please use using need want versus vs than then into also difference different between make happens happen handle'.split(' '));
const genericWords = new Set(['agent', 'agentic', 'development', 'system', 'concept', 'learn', 'learning', 'example', 'help', 'thing']);
const expansions: readonly [RegExp, string][] = [
  [/\bevaluat(?:e|ing|ion)\b/i, 'evaluation'],
  [/\b(choose|select|choosing|selecting) (?:a |an |the )?model\b/i, 'model selection'],
  [/\b(retries|retry|duplicate side effects)\b/i, 'idempotency retries'],
  [/\b(multiple|several|many) agents?\b/i, 'multi-agent delegation'],
  [/\b(subagents?|delegate|delegating)\b/i, 'multi-agent delegation'],
  [/\bremember(?:ing)?\b/i, 'memory persistent'],
  [/\b(forget|forgetting|running out of context)\b/i, 'context compaction memory'],
  [/\b(cheaper|cheap|expensive|spending)\b/i, 'cost optimization'],
  [/\b(vector|vectors)\b/i, 'embeddings semantic retrieval'],
  [/\bkeyword\b/i, 'lexical search'],
  [/\b(check correctness|know it worked)\b/i, 'verification success criteria'],
  [/\b(restart|resume|crash(?:es|ed)?)\b/i, 'recovery durable state'],
];

export function tokenize(text: string) {
  return (text.toLowerCase().normalize('NFKC').match(/[a-z0-9]+/g) ?? [])
    .map((token) => ({ evaluate: 'evaluation', evaluating: 'evaluation', evaluations: 'evaluation' })[token] ?? token)
    .filter((token) => !stopWords.has(token) && token.length > 1)
    .map((token) => {
      if (token.length > 4 && token.endsWith('ies')) return `${token.slice(0, -3)}y`;
      if (token.length > 3 && token.endsWith('s') && !token.endsWith('ss')) return token.slice(0, -1);
      return token;
    });
}

function expandQuery(query: string, index: LabSearchIndex) {
  let expanded = query;
  for (const [pattern, addition] of expansions) {
    if (pattern.test(query)) expanded += ` ${addition}`;
  }
  const normalized = ` ${query.toLowerCase().replace(/[^a-z0-9]+/g, ' ')} `;
  for (const [alias, canonical] of Object.entries(index.a)) {
    if (normalized.includes(` ${alias.replaceAll('-', ' ')} `)) expanded += ` ${canonical}`;
  }
  return [...new Set(tokenize(expanded))];
}

function createResult(index: LabSearchIndex): LabRetrievalResult {
  return {
    status: 'found',
    indexFingerprint: index.f,
    passages: [],
    relatedDocumentIds: [],
    notes: ['Source guidance is a dated reference snapshot; metadata review did not revalidate technical claims.'],
    inferenceCalls: 0,
  };
}

function toPassage(
  section: LabSection,
  documents: readonly LabDocument[],
  reason: string,
): LabPassage {
  const document = documents[section[1]];
  if (!document) throw new Error(`Index section references unknown document index: ${section[1]}`);
  return {
    documentId: document[0],
    path: document[1],
    title: document[2],
    heading: section[2],
    lineStart: section[4],
    lineEnd: section[5],
    text: section[3],
    matchReason: reason,
    sourceReviewDate: document[3],
    sourceStatus: document[4],
    scope: document[5],
    truncated: false,
  };
}

function serializedBytes(value: unknown) {
  return new TextEncoder().encode(`${JSON.stringify(value)}\n`).byteLength;
}

function limitResult(result: LabRetrievalResult) {
  let bytes = serializedBytes(result);
  if (bytes <= maximumBytes) return result;
  while (bytes > maximumBytes && result.passages.length > 1) {
    result.passages.pop();
    bytes = serializedBytes(result);
  }
  while (bytes > maximumBytes && result.passages.length) {
    const passage = result.passages[0];
    if (!passage) break;
    if (passage.text.length < 120) {
      result.passages = [];
      result.status = 'insufficient';
      result.reason = 'Evidence cannot fit the requested output budget.';
      bytes = serializedBytes(result);
      break;
    }
    passage.text = passage.text.slice(0, Math.max(80, Math.floor(passage.text.length * 0.75)));
    passage.truncated = true;
    passage.lineEnd = passage.lineStart + passage.text.split('\n').length - 1;
    bytes = serializedBytes(result);
  }
  while (bytes > maximumBytes && result.relatedDocumentIds.length) {
    result.relatedDocumentIds.pop();
    bytes = serializedBytes(result);
  }
  if (bytes > maximumBytes) throw new Error('Retrieval metadata exceeds the output budget.');
  return result;
}

export function retrieveEvidence(query: string, index: LabSearchIndex) {
  if (!query.trim() || query.length > 500) {
    throw new Error('Question must contain between 1 and 500 characters.');
  }

  const result = createResult(index);
  const terms = expandQuery(query, index);
  const documentsById = new Map(index.d.map((document) => [document[0], document]));
  const exactDocument = documentsById.get(query.trim().toUpperCase());
  if (exactDocument) return retrieveDocument(exactDocument[0], index);
  const meaningfulTerms = terms.filter((term) => !genericWords.has(term));

  if (!meaningfulTerms.length) {
    result.status = 'ambiguous';
    result.reason = 'The question names a broad subject without a specific learning goal.';
    result.clarificationOptions = [
      'Agent loops and orchestration',
      'Context, retrieval, and memory',
      'Skills, tools, and MCP',
      'Evaluation and security',
    ];
    return limitResult(result);
  }

  const recognizedTerms = meaningfulTerms.filter((term) => Object.hasOwn(index.p, term));
  if (!recognizedTerms.length) {
    result.status = 'insufficient';
    result.reason = 'No substantive query terms matched the corpus.';
    return limitResult(result);
  }

  const candidates = new Map<number, { score: number; matches: string[] }>();
  for (const term of recognizedTerms) {
    const postings = index.p[term] ?? [];
    for (let postingIndex = 0; postingIndex < postings.length; postingIndex += 2) {
      const sectionIndex = postings[postingIndex];
      const quantizedScore = postings[postingIndex + 1];
      if (sectionIndex === undefined || quantizedScore === undefined) {
        throw new Error(`Invalid posting for term: ${term}`);
      }
      const section = index.s[sectionIndex];
      if (!section) throw new Error(`Posting references unknown section: ${sectionIndex}`);
      const candidate = candidates.get(sectionIndex) ?? { score: 0, matches: [] };
      candidate.matches.push(term);
      candidate.score += quantizedScore / 1_000;
      candidates.set(sectionIndex, candidate);
    }
  }

  const ranked: Array<{ section: LabSection; score: number; matches: string[] }> = [];
  for (const [sectionIndex, candidate] of candidates) {
    const section = index.s[sectionIndex];
    if (!section || candidate.score <= 0) continue;
    const document = index.d[section[1]];
    if (!document) throw new Error(`Index section references unknown document index: ${section[1]}`);
    if (recognizedTerms.length <= 2 && /fundamentals|concepts/i.test(document[2])) candidate.score *= 1.8;
    candidate.score *= 0.4 + 0.6 * candidate.matches.length / recognizedTerms.length;
    ranked.push({ section, score: candidate.score, matches: candidate.matches });
  }

  ranked.sort((left, right) => right.score - left.score
    || left.section[0].localeCompare(right.section[0], 'en'));
  const best = ranked[0];
  if (!best || best.matches.length / meaningfulTerms.length < 0.25) {
    result.status = 'insufficient';
    result.reason = 'Too little of the requested subject is covered by matching passages.';
    return limitResult(result);
  }

  const documentCounts: Record<string, number> = {};
  const chosen: typeof ranked = [];
  for (const maximumPerDocument of [1, 2]) {
    for (const candidate of ranked) {
      if (chosen.length >= 4) break;
      const document = index.d[candidate.section[1]];
      if (!document) throw new Error(`Index section references unknown document index: ${candidate.section[1]}`);
      const documentId = document[0];
      if (
        candidate.score < best.score * 0.32
        || chosen.includes(candidate)
        || (documentCounts[documentId] ?? 0) >= maximumPerDocument
      ) continue;
      chosen.push(candidate);
      documentCounts[documentId] = (documentCounts[documentId] ?? 0) + 1;
    }
  }

  result.passages = chosen.map(({ section, matches }) => (
    toPassage(section, index.d, `Lexical match: ${matches.join(', ')}`)
  ));
  const selectedIds = new Set(result.passages.map(({ documentId }) => documentId));
  result.relatedDocumentIds.push(
    ...new Set(
      [...selectedIds].flatMap((id) => documentsById.get(id)?.[6] ?? []),
    ),
  );
  result.relatedDocumentIds.splice(
    0,
    result.relatedDocumentIds.length,
    ...result.relatedDocumentIds
      .filter((id) => !selectedIds.has(id) && documentsById.has(id))
      .slice(0, 6),
  );
  result.coverage = {
    matchedTerms: recognizedTerms,
    unmatchedTerms: meaningfulTerms.filter((term) => !Object.hasOwn(index.p, term)),
    interpretation: 'Lexical coverage only; not a calibrated confidence score.',
  };
  return limitResult(result);
}

export function retrieveDocument(documentId: string, index: LabSearchIndex) {
  if (!/^[a-z0-9-]+$/i.test(documentId)) throw new Error('Document ID is invalid.');
  const documentsById = new Map(index.d.map((document) => [document[0], document]));
  const document = documentsById.get(documentId.toUpperCase());
  if (!document) throw new Error(`Unknown indexed document ID: ${documentId}`);
  const documentIndex = index.d.indexOf(document);
  const result = createResult(index);
  result.passages = index.s
    .filter((section) => section[1] === documentIndex)
    .slice(0, 4)
    .map((section) => toPassage(section, index.d, 'Exact document ID'));
  result.relatedDocumentIds.push(...document[6].slice(0, 6));
  return limitResult(result);
}
