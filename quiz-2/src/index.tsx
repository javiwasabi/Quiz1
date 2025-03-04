import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom'; 
import { Routes, Route } from 'react-router-dom';
import First from './pages-PT-flow/fPage';
import Game from './pages-PT-flow/mPage';
import './utils/i18n';

const userLang = navigator.language || navigator.language;
const isSpanish = userLang.startsWith("es");
document.title = isSpanish 
  ? "Personaje fantástico vs Tecnología digital" 
  : "Fantasy Character or Digital Technology";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter basename="/quiz2">
        <Routes>
          <Route path="/" element={<First />} /> 
          <Route path="/guess" element={<Game />} /> 
        </Routes>
      </BrowserRouter>
    </Suspense>
  </React.StrictMode>
);

reportWebVitals();
