import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Vie from './pages-IK-flow/firstPage'; 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Middle from './pages-IK-flow/middlePage';
import Last from './pages-IK-flow/lastPage';
import First from './pages-PT-flow/fPage';
import {store} from './app/store';
import { Provider } from 'react-redux';
import Game from './pages-PT-flow/mPage';
import LastP from './pages-PT-flow/lastPage';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Vie />} /> 
          <Route path="/question" element={<Middle />} /> 
          <Route path="/final" element={<Last />} /> 
          <Route path="/fp" element={<First />} /> 
          <Route path="/guess" element={<Game />} /> 
          <Route path="/p" element={<LastP />} />
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
