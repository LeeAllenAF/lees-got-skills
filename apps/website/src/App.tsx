import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { SiteShell } from './components/SiteShell';
import { getDocumentTitle, siteRoutes } from './routes';

function RouteEffects() {
  const location = useLocation();

  useEffect(() => {
    document.title = getDocumentTitle(location.pathname);
    document.getElementById('main-content')?.focus({ preventScroll: true });
    window.scrollTo({ top: 0 });
  }, [location.pathname]);

  return null;
}

export function App() {
  return (
    <SiteShell>
      <RouteEffects />
      <Routes>
        {siteRoutes.map(({ Component, path }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
      </Routes>
    </SiteShell>
  );
}
