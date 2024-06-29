// App.js

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Menu from './Components/Menu/Menu'; // Importe o componente de menu aqui
import Genero from './Components/Genero/Genero';
import Ator from './Components/Ator/Ator';
import Diretor from './Components/Diretor/Diretor';
import Filme from './Components/Filme/Filme';
import './App.css';


const App = () => {
  return (
    <BrowserRouter>
      <div>
        
        <Routes>
          <Route path="/" element={<Menu />} />
          <Route path="/genero" element={<Genero />} />
          <Route path="/ator" element={<Ator />} />
          <Route path="/diretor" element={<Diretor />} />
          <Route path="/filme" element={<Filme />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
