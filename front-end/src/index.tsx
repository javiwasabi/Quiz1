import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Vie from './pages-IK-flow/firstPage'; 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Middle from './pages-IK-flow/middlePage';
import Last from './pages-IK-flow/lastPage';

import { Provider } from 'react-redux';

import './utils/i18n';
document.title = '¿Asesino serial o Programador informático?'; 
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Suspense fallback= {<div>Loading... </div>}>
 
      <Router>
        <Routes>
          <Route path="/" element={<Vie />} /> 
          <Route path="/question" element={<Middle />} /> 
          <Route path="/final" element={<Last />} /> 
         
        </Routes>
      </Router>
      </Suspense>
  </React.StrictMode>
);

reportWebVitals();
