import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Vie from './pages/firstPage'; // Asegúrate de que la ruta esté correcta
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Importa Router y Routes
import Middle from './pages/middlePage';
import Last from './pages/lastPage';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Vie />} /> 
        <Route path="/question" element={<Middle />} /> 
        <Route path="/final" element={<Last />} /> 
     
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
