import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import type { WikiDocumentSummary, WikiIndex } from '../wiki';

interface WikiTreeProps {
  readonly activeDocumentId?: string | undefined;
  readonly error: boolean;
  readonly onQueryChange: (query: string) => void;
  readonly query: string;
  readonly wikiIndex?: WikiIndex | undefined;
}

interface TopicBranch {
  readonly topic: string;
  readonly documents: readonly WikiDocumentSummary[];
}

interface CollectionBranch {
  readonly collection: string;
  readonly topics: readonly TopicBranch[];
  readonly documentCount: number;
}

function formatBranchName(value: string) {
  return value
    .split(/[-_]/u)
    .filter(Boolean)
    .map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
    .join(' ');
}

function createBranches(documents: readonly WikiDocumentSummary[]): readonly CollectionBranch[] {
  const collections = new Map<string, Map<string, WikiDocumentSummary[]>>();

  documents.forEach((document) => {
    const topics = collections.get(document.collection) ?? new Map<string, WikiDocumentSummary[]>();
    const topicDocuments = topics.get(document.topic) ?? [];
    topicDocuments.push(document);
    topics.set(document.topic, topicDocuments);
    collections.set(document.collection, topics);
  });

  return [...collections.entries()]
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([collection, topics]) => {
      const topicBranches = [...topics.entries()]
        .sort(([left], [right]) => left.localeCompare(right))
        .map(([topic, topicDocuments]) => ({
          topic,
          documents: topicDocuments.sort((left, right) => left.title.localeCompare(right.title)),
        }));

      return {
        collection,
        topics: topicBranches,
        documentCount: topicBranches.reduce((count, topic) => count + topic.documents.length, 0),
      };
    });
}

export function WikiTree({
  activeDocumentId,
  error,
  onQueryChange,
  query,
  wikiIndex,
}: WikiTreeProps) {
  const normalizedQuery = query.trim().toLowerCase();
  const documents = useMemo(() => wikiIndex?.documents.filter((document) => {
    if (!normalizedQuery) return true;
    return [
      document.id,
      document.title,
      document.summary,
      document.collection,
      document.topic,
      ...document.tags,
    ].join(' ').toLowerCase().includes(normalizedQuery);
  }) ?? [], [normalizedQuery, wikiIndex]);
  const branches = useMemo(() => createBranches(documents), [documents]);

  return (
    <aside className="wiki-tree-panel" aria-labelledby="wiki-tree-title">
      <div className="wiki-tree-panel__header">
        <div>
          <p className="eyebrow">// FILE EXPLORER</p>
          <h2 id="wiki-tree-title">Corpus tree</h2>
        </div>
        <span aria-live="polite">
          {wikiIndex ? `${documents.length}/${wikiIndex.documentCount}` : '…'}
        </span>
      </div>
      <label className="wiki-tree-search">
        <span>Filter documents</span>
        <input
          type="search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="context, evals, tools…"
        />
      </label>
      {error && <p className="wiki-tree-state" role="alert">The corpus index could not be loaded.</p>}
      {!error && !wikiIndex && <p className="wiki-tree-state" aria-live="polite">Loading corpus tree…</p>}
      {wikiIndex && branches.length === 0 && <p className="wiki-tree-state">No matching documents.</p>}
      {branches.length > 0 && (
        <nav className="wiki-tree" aria-label="Corpus documents">
          <ul>
            {branches.map((branch) => {
              const containsActiveDocument = branch.topics.some((topic) => topic.documents.some(
                (document) => document.id.toLowerCase() === activeDocumentId?.toLowerCase(),
              ));
              return (
                <li key={branch.collection}>
                  <details
                    open={Boolean(normalizedQuery || containsActiveDocument) || undefined}
                    key={`${branch.collection}-${normalizedQuery ? 'filtered' : 'all'}`}
                  >
                    <summary>
                      <span>{formatBranchName(branch.collection)}</span>
                      <span>{branch.documentCount}</span>
                    </summary>
                    <ul>
                      {branch.topics.map((topic) => {
                        const containsActiveTopicDocument = topic.documents.some(
                          (document) => document.id.toLowerCase() === activeDocumentId?.toLowerCase(),
                        );
                        return (
                          <li key={topic.topic}>
                            <details open={Boolean(normalizedQuery || containsActiveTopicDocument) || undefined}>
                              <summary>
                                <span>{formatBranchName(topic.topic)}</span>
                                <span>{topic.documents.length}</span>
                              </summary>
                              <ul>
                                {topic.documents.map((document) => {
                                  const isActive = document.id.toLowerCase() === activeDocumentId?.toLowerCase();
                                  return (
                                    <li key={document.id}>
                                      <Link
                                        className={isActive ? 'is-active' : undefined}
                                        aria-current={isActive ? 'page' : undefined}
                                        to={`/wiki/${document.id.toLowerCase()}`}
                                      >
                                        <span>{document.title}</span>
                                        <small>{document.id}</small>
                                      </Link>
                                    </li>
                                  );
                                })}
                              </ul>
                            </details>
                          </li>
                        );
                      })}
                    </ul>
                  </details>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </aside>
  );
}
