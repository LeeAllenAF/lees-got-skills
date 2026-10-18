import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { navigationRoutes } from '../routes';
import './SiteShell.css';

const githubUrl = 'https://github.com/LeeAllenAF/lees-got-skills';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();

  useEffect(() => setMenuOpen(false), [location.pathname]);

  useEffect(() => {
    if (!menuOpen) return;

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key !== 'Escape') return;
      setMenuOpen(false);
      menuButtonRef.current?.focus();
    }

    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, [menuOpen]);

  return (
    <header className="site-header">
      <Link className="brand" to="/" aria-label="Lee's Got Skills home">
        <span aria-hidden="true">›</span>
        <span>lee’s got skills_</span>
      </Link>
      <button
        ref={menuButtonRef}
        className="menu-button"
        type="button"
        aria-expanded={menuOpen}
        aria-controls="site-navigation"
        onClick={() => setMenuOpen((current) => !current)}
      >
        <span className="sr-only">
          {menuOpen ? 'Close navigation' : 'Open navigation'}
        </span>
        <span aria-hidden="true">{menuOpen ? '×' : '☰'}</span>
      </button>
      <nav
        id="site-navigation"
        className={menuOpen ? 'site-nav is-open' : 'site-nav'}
        aria-label="Primary navigation"
      >
        <ul>
          {navigationRoutes.map(({ navigationLabel, path }) => (
            <li key={path}>
              <NavLink to={path}>{navigationLabel}</NavLink>
            </li>
          ))}
          <li className="nav-divider" aria-hidden="true">|</li>
          <li>
            <a href={githubUrl}>
              GitHub <span className="external-mark" aria-hidden="true">↗</span>
            </a>
          </li>
        </ul>
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

interface SiteShellProps {
  readonly children: ReactNode;
}

export function SiteShell({ children }: SiteShellProps) {
  return (
    <div className="site-frame">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Header />
      <main id="main-content" tabIndex={-1}>{children}</main>
      <Footer />
    </div>
  );
}
