import '@fontsource-variable/geist/wght.css';
import '@fontsource/jetbrains-mono/latin-400.css';

import './app.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
