export interface WikiDocumentSummary {
  readonly id: string;
  readonly title: string;
  readonly summary: string;
  readonly collection: string;
  readonly topic: string;
  readonly type: string;
  readonly status: string;
  readonly tags: readonly string[];
  readonly domains: readonly string[];
  readonly scope: readonly string[];
  readonly sourceReviewDate: string;
  readonly sourcePath: string;
  readonly relatedDocumentIds: readonly string[];
}

export interface WikiDocument extends WikiDocumentSummary {
  readonly body: string;
}

export interface WikiIndex {
  readonly schemaVersion: number;
  readonly contentFingerprint: string;
  readonly documentCount: number;
  readonly topics: readonly {
    readonly topic: string;
    readonly count: number;
  }[];
  readonly documents: readonly WikiDocumentSummary[];
}

async function readWikiJson<T>(url: string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(url, signal ? { signal } : undefined);
  if (!response.ok) throw new Error(`Wiki request failed with status ${response.status}`);
  return response.json() as Promise<T>;
}

export function loadWikiIndex(signal?: AbortSignal) {
  return readWikiJson<WikiIndex>('/wiki-data/index.json', signal);
}

export function loadWikiDocument(documentId: string, signal?: AbortSignal) {
  if (!/^[a-z0-9-]+$/i.test(documentId)) {
    return Promise.reject(new Error('Invalid wiki document ID'));
  }

  return readWikiJson<WikiDocument>(`/wiki-data/${documentId.toLowerCase()}.json`, signal);
}
