import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Vie from './pages-IK-flow/firstPage'; 
import { BrowserRouter } from 'react-router-dom'; 
import { Routes, Route } from 'react-router-dom';
import Middle from './pages-IK-flow/middlePage';
import './utils/i18n';

const userLang = navigator.language || navigator.language;
const isSpanish = userLang.startsWith("es");
document.title = isSpanish 
  ? "¿Asesino serial o creador de sistema operativo?" 
  : "Serial Killer or Operating System Creator?";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter basename="/visionariotechoasesino">
        <Routes>
          <Route path="/" element={<Vie />} /> 
          <Route path="/question" element={<Middle />} /> 
        </Routes>
      </BrowserRouter>
    </Suspense>
  </React.StrictMode>
);

reportWebVitals();
