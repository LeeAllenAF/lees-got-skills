import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { WikiMarkdown } from '../components/WikiMarkdown';
import { loadWikiDocument, type WikiDocument } from '../wiki';
import './WikiPage.css';

export function WikiDocumentPage() {
  const { documentId = '' } = useParams();
  const [document, setDocument] = useState<WikiDocument>();
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    setDocument(undefined);
    setError(false);
    loadWikiDocument(documentId, controller.signal)
      .then((loadedDocument) => {
        setDocument(loadedDocument);
        window.document.title = `${loadedDocument.title} // Wiki // Lee's Got Skills`;
      })
      .catch((requestError: unknown) => {
        if (!(requestError instanceof DOMException && requestError.name === 'AbortError')) setError(true);
      });
    return () => controller.abort();
  }, [documentId]);

  if (error) {
    return (
      <section className="content-section wiki-state">
        <p className="eyebrow">// WIKI</p>
        <h1>DOCUMENT NOT FOUND.</h1>
        <p>The requested corpus document is unavailable or its generated data is stale.</p>
        <Link className="button" to="/wiki">Return to the wiki</Link>
      </section>
    );
  }

  if (!document) return <p className="empty-state wiki-loading" aria-live="polite">Loading document…</p>;

  return (
    <article className="wiki-document">
      <header className="wiki-document__header">
        <Link className="wiki-back" to="/wiki">← Wiki index</Link>
        <p className="eyebrow">// {document.id} / {document.topic}</p>
        <h1>{document.title}</h1>
        <p className="wiki-document__summary">{document.summary}</p>
        <dl className="wiki-facts">
          <div><dt>Status</dt><dd>{document.status}</dd></div>
          <div><dt>Type</dt><dd>{document.type}</dd></div>
          <div><dt>Source review</dt><dd>{document.sourceReviewDate}</dd></div>
        </dl>
      </header>
      <div className="wiki-document__layout">
        <div className="wiki-prose"><WikiMarkdown markdown={document.body} /></div>
        <aside className="wiki-related" aria-labelledby="related-documents-title">
          <h2 id="related-documents-title">Related documents</h2>
          {document.relatedDocumentIds.length > 0 ? (
            <ul>{document.relatedDocumentIds.map((id) => <li key={id}><Link to={`/wiki/${id.toLowerCase()}`}>{id}</Link></li>)}</ul>
          ) : <p>No related documents are listed.</p>}
          <p className="wiki-source">Source: <code>{document.sourcePath}</code></p>
        </aside>
      </div>
    </article>
  );
}
