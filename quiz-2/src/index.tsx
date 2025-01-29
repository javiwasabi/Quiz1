import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import PokemonCard from './pages-PT-flow/poke';
import First from './pages-PT-flow/fPage';
import { Provider } from 'react-redux';
import Game from './pages-PT-flow/mPage';
import LastP from './pages-PT-flow/lastPage';
import './utils/i18n';

const userLang = navigator.language || navigator.language;
const isSpanish = userLang.startsWith("es");
document.title = isSpanish ? "Pokémon vs Tecnología" : "Pokemon vs Technology";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Suspense fallback= {<div>Loading... </div>}>
 
      <Router>
        <Routes>

          <Route path="/" element={<First />} /> 
          <Route path="/guess" element={<Game />} /> 
          <Route path="/p" element={<LastP />} />

          <Route path="/poke" element={<PokemonCard />} />
          
        </Routes>
      </Router>
      </Suspense>
  </React.StrictMode>
);

reportWebVitals();