import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import faviconUrl from '../../../favicon.ico?url';
import { App } from './App';
import './styles.css';

const favicon = document.querySelector<HTMLLinkElement>('#site-favicon');
if (favicon) favicon.href = faviconUrl;

const root = document.getElementById('root');
if (!root) throw new Error('Application root was not found.');

createRoot(root).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
