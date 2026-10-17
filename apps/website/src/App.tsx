import { useEffect, useState, type ReactNode } from 'react';
import {
  Link,
  NavLink,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import alienFishLogo from '../../../alienfish-logo-savage.png';
import { articles } from './data/articles';
import { skills } from './data/skills';

const githubUrl = 'https://github.com/LeeAllenAF/lees-got-skills';

function Arrow() {
  return <span aria-hidden="true">→</span>;
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => setMenuOpen(false), [location.pathname]);

  return (
    <header className="site-header">
      <Link className="brand" to="/" aria-label="Lee's Got Skills home">
        <span aria-hidden="true">›</span>
        <span>lee’s got skills_</span>
      </Link>
      <button
        className="menu-button"
        type="button"
        aria-expanded={menuOpen}
        aria-controls="site-navigation"
        onClick={() => setMenuOpen((current) => !current)}
      >
        <span className="sr-only">Toggle navigation</span>
        <span aria-hidden="true">{menuOpen ? '×' : '☰'}</span>
      </button>
      <nav
        id="site-navigation"
        className={menuOpen ? 'site-nav is-open' : 'site-nav'}
        aria-label="Primary navigation"
      >
        <NavLink to="/skills">Skills</NavLink>
        <NavLink to="/blog">Blog</NavLink>
        <NavLink to="/about">About</NavLink>
        <span className="nav-divider" aria-hidden="true">|</span>
        <a href={githubUrl}>GitHub <span className="external-mark" aria-hidden="true">↗</span></a>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <span>Est. 2026 // lees-got-skills.com</span>
      <span>[ good software swims here ]</span>
    </footer>
  );
}

function Shell({ children }: { readonly children: ReactNode }) {
  return (
    <div className="site-frame">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Header />
      <main id="main-content" tabIndex={-1}>{children}</main>
      <Footer />
    </div>
  );
}

function FishArtwork({ compact = false }: { readonly compact?: boolean }) {
  return (
    <div className={compact ? 'fish-art fish-art--compact' : 'fish-art'} aria-hidden="true">
      <span className="orb orb--one" />
      <span className="orb orb--two" />
      <img src={alienFishLogo} alt="" />
      {!compact && <p className="terminal-note">STAY<br />CURIOUS.<br />BUILD<br />ANYWAY.</p>}
    </div>
  );
}

const homeCards = [
  {
    icon: '</>',
    title: 'Agent Skills',
    text: 'Small, useful, and built to travel.',
    to: '/skills',
  },
  {
    icon: '▤',
    title: 'The Blog',
    text: 'Experiments, mistakes, victories.',
    to: '/blog',
  },
  {
    icon: '◉',
    title: 'About Me',
    text: 'The human behind the keyboard.',
    to: '/about',
  },
] as const;

function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">// PORTABLE SKILLS · PRACTICAL NOTES</p>
          <h1>GOOD SKILLS.<br />BAD PUNS.<br />BETTER SOFTWARE.</h1>
          <p className="hero-intro">
            A collection of portable agent skills, engineering experiments, and notes from the command line.
          </p>
          <div className="button-row">
            <Link className="button button--primary" to="/skills"><Arrow /> Explore Skills</Link>
            <Link className="button" to="/blog"><Arrow /> Read the Blog</Link>
          </div>
        </div>
        <FishArtwork />
      </section>
      <section className="home-cards" aria-label="Explore the site">
        {homeCards.map((card) => (
          <Link className="home-card" to={card.to} key={card.title}>
            <span className="card-icon" aria-hidden="true">{card.icon}</span>
            <span>
              <strong>{card.title}</strong>
              <small>{card.text}</small>
            </span>
            <Arrow />
          </Link>
        ))}
      </section>
    </>
  );
}

function PageIntro({ eyebrow, title, children }: {
  readonly eyebrow: string;
  readonly title: string;
  readonly children: ReactNode;
}) {
  return (
    <section className="page-intro">
      <div>
        <p className="eyebrow">// {eyebrow}</p>
        <h1>{title}</h1>
        <div className="page-summary">{children}</div>
      </div>
      <FishArtwork compact />
    </section>
  );
}

function SkillsPage() {
  return (
    <>
      <PageIntro eyebrow="SKILLS" title="INDEPENDENTLY PACKAGED. BUILT TO TRAVEL.">
        <p>A small catalog of portable agent skills and developer tools. Source remains proprietary; only officially released artifacts are free to use under their release terms.</p>
      </PageIntro>
      <section className="content-section" aria-labelledby="skill-catalog-title">
        <div className="section-heading">
          <h2 id="skill-catalog-title">Skill catalog</h2>
          <span>{skills.length.toString().padStart(2, '0')} entry</span>
        </div>
        <div className="skill-list">
          {skills.map((skill) => (
            <article className="skill-card" key={skill.name}>
              <div className="skill-glyph" aria-hidden="true">◇</div>
              <div className="skill-main">
                <div className="skill-title-row">
                  <h3>{skill.name}</h3>
                  <span className={`status status--${skill.releaseStatus}`}>{skill.releaseStatus}</span>
                </div>
                <p>{skill.description}</p>
                <div className="tag-row" aria-label="Compatible agents">
                  {skill.agentCompatibility.map((agent) => <span className="tag" key={agent}>{agent}</span>)}
                </div>
              </div>
              <dl className="skill-meta">
                <div><dt>Version</dt><dd>v{skill.version}</dd></div>
                <div><dt>Release</dt><dd>No official release yet</dd></div>
              </dl>
              <div className="skill-links">
                <a href={skill.docsUrl}>Documentation <Arrow /></a>
                {skill.installUrl ? <a href={skill.installUrl}>Install <Arrow /></a> : <span>Install pending</span>}
                {skill.releaseUrl ? <a href={skill.releaseUrl}>Release notes <Arrow /></a> : <span>Release notes pending</span>}
              </div>
            </article>
          ))}
        </div>
        <p className="catalog-note">Local typed metadata is the source for this catalog today. A release manifest can replace it later without changing the page contract.</p>
      </section>
    </>
  );
}

function BlogPage() {
  const publishedArticles = articles.filter((article) => article.status === 'published');

  return (
    <>
      <PageIntro eyebrow="BLOG" title="DISPATCHES FROM THE DEEP.">
        <p>Experiments, lessons, mistakes, and the occasional victory—published deliberately, never automatically.</p>
      </PageIntro>
      <section className="content-section" aria-labelledby="dispatches-title">
        <div className="section-heading">
          <h2 id="dispatches-title">Published notes</h2>
          <span>{publishedArticles.length.toString().padStart(2, '0')} dispatch</span>
        </div>
        <div className="article-list">
          {publishedArticles.map((article) => (
            <article className="article-card" key={article.slug}>
              <div className="article-date">
                <time dateTime={article.date}>{new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(new Date(`${article.date}T12:00:00`))}</time>
                <span className="status status--released">{article.status}</span>
              </div>
              <h2>{article.title}</h2>
              <p className="article-summary">{article.summary}</p>
              <div className="article-body">
                {article.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
              <div className="tag-row" aria-label="Article tags">
                {article.tags.map((tag) => <span className="tag" key={tag}>#{tag}</span>)}
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

const values = [
  ['✦', 'Curiosity first', 'Ask questions, explore ideas, and embrace the weird.'],
  ['>_', 'Deterministic by default', 'Prefer practical, inspectable solutions whenever possible.'],
  ['⌾', 'Security & responsibility', 'Build with intent, validate what matters, and be transparent.'],
  ['↗', 'Real-world focus', 'Make tools that solve actual problems and can be used today.'],
] as const;

function AboutPage() {
  return (
    <>
      <PageIntro eyebrow="ABOUT" title="THE HUMAN BEHIND THE KEYBOARD.">
        <p>I’m Lee—a developer, problem solver, and perpetual tinkerer. Lee’s Got Skills is my personal lab for exploring agentic development, building useful tools, and documenting the journey.</p>
      </PageIntro>
      <section className="about-grid" aria-label="Working values">
        {values.map(([icon, title, description]) => (
          <article className="value-card" key={title}>
            <span aria-hidden="true">{icon}</span>
            <div><h2>{title}</h2><p>{description}</p></div>
          </article>
        ))}
      </section>
      <section className="about-note">
        <p>Lee’s Got Skills is an independent developer workshop. It flies the AlienFish flag and links to the related <a href="https://github.com/AlienFish">AlienFish GitHub organization</a>, but this site does not claim to be owned by AlienFish.</p>
      </section>
    </>
  );
}

function NotFoundPage() {
  return (
    <section className="not-found">
      <p className="eyebrow">// 404</p>
      <h1>THAT FISH SWAM AWAY.</h1>
      <p>The requested page is not in this part of the aquarium.</p>
      <Link className="button button--primary" to="/"><Arrow /> Return home</Link>
    </section>
  );
}

const titles: Record<string, string> = {
  '/': "Lee's Got Skills",
  '/skills': "Skills // Lee's Got Skills",
  '/blog': "Blog // Lee's Got Skills",
  '/about': "About // Lee's Got Skills",
};

export function App() {
  const location = useLocation();

  useEffect(() => {
    document.title = titles[location.pathname] ?? "Not Found // Lee's Got Skills";
    document.getElementById('main-content')?.focus({ preventScroll: true });
    window.scrollTo({ top: 0 });
  }, [location.pathname]);

  return (
    <Shell>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/skills" element={<SkillsPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Shell>
  );
}
