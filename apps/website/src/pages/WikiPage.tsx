import { useEffect, useMemo, useState } from 'react';
import { PageIntro } from '../components/PageIntro';
import { WikiTree } from '../components/WikiTree';
import { loadWikiIndex, type WikiIndex } from '../wiki';
import './WikiPage.css';

export function WikiPage() {
  const [wikiIndex, setWikiIndex] = useState<WikiIndex>();
  const [error, setError] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    loadWikiIndex(controller.signal)
      .then(setWikiIndex)
      .catch((requestError: unknown) => {
        if (!(requestError instanceof DOMException && requestError.name === 'AbortError')) setError(true);
      });
    return () => controller.abort();
  }, []);

  const collections = useMemo(() => new Set(
    wikiIndex?.documents.map((document) => document.collection) ?? [],
  ).size, [wikiIndex]);

  return (
    <div className="wiki-page">
      <PageIntro eyebrow="WIKI" title="AGENT ENGINEERING, CHARTED.">
        <p>A navigable map of the local corpus: collections become branches, topics become folders, and every document keeps its place.</p>
      </PageIntro>
      <section className="wiki-workspace" aria-label="Wiki explorer">
        <WikiTree
          error={error}
          onQueryChange={setQuery}
          query={query}
          wikiIndex={wikiIndex}
        />
        <div className="wiki-overview">
          <p className="eyebrow">// CORPUS MAP</p>
          <h2>Pick a branch. Follow the thread.</h2>
          <p>The explorer keeps the corpus hierarchy visible instead of flattening a growing body of work into one wall of cards. Open a collection, narrow to a topic, then choose a document.</p>
          <dl className="wiki-overview__facts">
            <div><dt>Collections</dt><dd>{wikiIndex ? collections : '—'}</dd></div>
            <div><dt>Topics</dt><dd>{wikiIndex?.topics.length ?? '—'}</dd></div>
            <div><dt>Documents</dt><dd>{wikiIndex?.documentCount ?? '—'}</dd></div>
          </dl>
          <div className="wiki-overview__note">
            <h3>Built for wandering</h3>
            <p>Search cuts across every branch. The tree stays beside the reader on desktop, so moving between related documents no longer means returning to an index.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
