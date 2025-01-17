import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import First from './pages-PT-flow/fPage';

import Game from './pages-PT-flow/mPage';
import LastP from './pages-PT-flow/lastPage';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
 
      <Router>
        <Routes>
          <Route path="/" element={<First />} /> 
          <Route path="/guess" element={<Game />} /> 
          <Route path="/p" element={<LastP />} />
        </Routes>
      </Router>
        </React.StrictMode>
);

reportWebVitals();
