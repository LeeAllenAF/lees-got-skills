import { PageIntro } from '../components/PageIntro';
import { articles } from '../data/articles';
import { formatArticleDate, formatCount } from '../formatters';
import './BlogPage.css';

export function BlogPage() {
  const publishedArticles = articles.filter((article) => article.status === 'published');

  return (
    <>
      <PageIntro eyebrow="BLOG" title="DISPATCHES FROM THE DEEP.">
        <p>Experiments, lessons, mistakes, and the occasional victory—published deliberately, never automatically.</p>
      </PageIntro>
      <section className="content-section" aria-labelledby="dispatches-title">
        <div className="section-heading">
          <h2 id="dispatches-title">Published notes</h2>
          <span>{formatCount(publishedArticles.length, 'dispatch', 'dispatches')}</span>
        </div>
        {publishedArticles.length === 0 ? (
          <p className="empty-state">No notes have been published yet.</p>
        ) : (
          <ul className="article-list">
            {publishedArticles.map((article) => (
              <li key={article.slug}>
                <article className="article-card">
                  <div className="article-date">
                    <time dateTime={article.date}>{formatArticleDate(article.date)}</time>
                    <span className="status status--released">{article.status}</span>
                  </div>
                  <h2>{article.title}</h2>
                  <p className="article-summary">{article.summary}</p>
                  <div className="article-body">
                    {article.paragraphs.map((paragraph, index) => (
                      <p key={`${article.slug}-${index.toString()}`}>{paragraph}</p>
                    ))}
                  </div>
                  <ul className="tag-row" aria-label="Article tags">
                    {article.tags.map((tag) => <li className="tag" key={tag}>#{tag}</li>)}
                  </ul>
                </article>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
