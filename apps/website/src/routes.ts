import type { ComponentType } from 'react';
import { AboutPage } from './pages/AboutPage';
import { BlogPage } from './pages/BlogPage';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { SkillsPage } from './pages/SkillsPage';

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
    path: '/blog',
    title: "Blog // Lee's Got Skills",
    navigationLabel: 'Blog',
    Component: BlogPage,
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
    ?? "Not Found // Lee's Got Skills";
}
