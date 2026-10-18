import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { PageIntro } from '../components/PageIntro';
import { loadWikiIndex, type WikiIndex } from '../wiki';
import './WikiPage.css';

export function WikiPage() {
  const [wikiIndex, setWikiIndex] = useState<WikiIndex>();
  const [error, setError] = useState(false);
  const [query, setQuery] = useState('');
  const [topic, setTopic] = useState('all');

  useEffect(() => {
    const controller = new AbortController();
    loadWikiIndex(controller.signal)
      .then(setWikiIndex)
      .catch((requestError: unknown) => {
        if (!(requestError instanceof DOMException && requestError.name === 'AbortError')) setError(true);
      });
    return () => controller.abort();
  }, []);

  const documents = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return wikiIndex?.documents.filter((document) => {
      const matchesTopic = topic === 'all' || document.topic === topic;
      const searchText = [document.id, document.title, document.summary, ...document.tags]
        .join(' ')
        .toLowerCase();
      return matchesTopic && (!normalizedQuery || searchText.includes(normalizedQuery));
    }) ?? [];
  }, [query, topic, wikiIndex]);

  const documentGroups = useMemo(() => wikiIndex?.topics
    .map((entry) => ({
      ...entry,
      documents: documents.filter((document) => document.topic === entry.topic),
    }))
    .filter((entry) => entry.documents.length > 0) ?? [], [documents, wikiIndex]);

  return (
    <>
      <PageIntro eyebrow="WIKI" title="AGENT ENGINEERING, CHARTED.">
        <p>A browsable map of the local corpus: architecture, context, tools, evaluation, security, operations, and the connective tissue between them.</p>
      </PageIntro>
      <section className="content-section wiki-browser" aria-labelledby="wiki-library-title">
        <div className="section-heading">
          <h2 id="wiki-library-title">Knowledge library</h2>
          <span aria-live="polite">{wikiIndex ? `${documents.length} of ${wikiIndex.documentCount} documents` : 'Loading index'}</span>
        </div>

        {wikiIndex && (
          <section className="wiki-topic-directory" aria-labelledby="wiki-topic-directory-title">
            <div className="wiki-topic-directory__heading">
              <h3 id="wiki-topic-directory-title">Browse by topic</h3>
              <span>{wikiIndex.topics.length} subject areas</span>
            </div>
            <ul>
              <li>
                <button type="button" aria-pressed={topic === 'all'} onClick={() => setTopic('all')}>
                  <strong>All topics</strong>
                  <span>{wikiIndex.documentCount} documents</span>
                  {topic === 'all' && <span className="wiki-topic-selected" aria-hidden="true">Selected</span>}
                </button>
              </li>
              {wikiIndex.topics.map((entry) => (
                <li key={entry.topic}>
                  <button type="button" aria-pressed={topic === entry.topic} onClick={() => setTopic(entry.topic)}>
                    <strong>{entry.topic}</strong>
                    <span>{entry.count} documents</span>
                    {topic === entry.topic && <span className="wiki-topic-selected" aria-hidden="true">Selected</span>}
                  </button>
                </li>
              ))}
            </ul>
          </section>
        )}

        <div className="wiki-controls">
          <label>
            <span>Search the wiki</span>
            <input value={query} onChange={(event) => setQuery(event.target.value)} type="search" placeholder="Try context, delegation, evals…" />
          </label>
        </div>

        {error && <p className="empty-state" role="alert">The wiki index could not be loaded. Try refreshing the page.</p>}
        {!error && !wikiIndex && <p className="empty-state" aria-live="polite">Loading the knowledge map…</p>}
        {wikiIndex && documents.length === 0 && <p className="empty-state">No documents match those filters.</p>}
        <div className="wiki-results">
          {documentGroups.map((group) => {
            const groupTitleId = `wiki-topic-${group.topic}`;
            return (
              <section className="wiki-topic-group" aria-labelledby={groupTitleId} key={group.topic}>
                <div className="wiki-topic-group__heading">
                  <h3 id={groupTitleId}>{group.topic}</h3>
                  <span>{group.documents.length} {group.documents.length === 1 ? 'document' : 'documents'}</span>
                </div>
                <ul className="wiki-grid">
                  {group.documents.map((document) => (
                    <li key={document.id}>
                      <Link className="wiki-card" to={`/wiki/${document.id.toLowerCase()}`}>
                        <span className="wiki-card__meta">{document.id} // {document.collection}</span>
                        <strong>{document.title}</strong>
                        <span>{document.summary}</span>
                        <ul className="tag-row" aria-label={`${document.title} tags`}>
                          {document.tags.map((tag) => <li className="tag" key={tag}>#{tag}</li>)}
                        </ul>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      </section>
    </>
  );
}
