import type { ComponentType } from 'react';
import { AboutPage } from './pages/AboutPage';
import { BlogPage } from './pages/BlogPage';
import { CorpusLabPage } from './pages/CorpusLabPage';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { SkillsPage } from './pages/SkillsPage';
import { WikiDocumentPage } from './pages/WikiDocumentPage';
import { WikiPage } from './pages/WikiPage';

interface SiteRoute {
  readonly path: string;
  readonly title: string;
  readonly navigationLabel?: string;
  readonly Component: ComponentType;
}

export const siteRoutes: readonly SiteRoute[] = [
  { path: '/', title: "Lee's Got Skills", Component: HomePage },
  {
    path: '/skills',
    title: "Skills // Lee's Got Skills",
    navigationLabel: 'Skills',
    Component: SkillsPage,
  },
  {
    path: '/lab',
    title: "Corpus Lab // Lee's Got Skills",
    navigationLabel: 'Lab',
    Component: CorpusLabPage,
  },
  {
    path: '/blog',
    title: "Blog // Lee's Got Skills",
    navigationLabel: 'Blog',
    Component: BlogPage,
  },
  {
    path: '/wiki',
    title: "Wiki // Lee's Got Skills",
    navigationLabel: 'Wiki',
    Component: WikiPage,
  },
  {
    path: '/wiki/:documentId',
    title: "Wiki // Lee's Got Skills",
    Component: WikiDocumentPage,
  },
  {
    path: '/about',
    title: "About // Lee's Got Skills",
    navigationLabel: 'About',
    Component: AboutPage,
  },
  {
    path: '*',
    title: "Not Found // Lee's Got Skills",
    Component: NotFoundPage,
  },
];

export const navigationRoutes = siteRoutes.filter(
  (route): route is SiteRoute & { readonly navigationLabel: string } =>
    route.navigationLabel !== undefined,
);

export function getDocumentTitle(pathname: string) {
  return siteRoutes.find((route) => route.path === pathname)?.title
    ?? (pathname.startsWith('/wiki/') ? "Wiki // Lee's Got Skills" : undefined)
    ?? "Not Found // Lee's Got Skills";
}
