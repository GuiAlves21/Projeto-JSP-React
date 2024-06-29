// Menu.js

import React from 'react';
import { Link } from 'react-router-dom';
import './MenuCss.css';

const Menu = () => {
  return (
    <div className='caixaPrincipal'>
      <div className='caixaLogo'>
      <img src='./logo.png' alt='Logo' className='logo' />
      </div>
      <div className='caixaNav'>
    <nav>
      <ul>
        <li><Link to="/genero">Gênero</Link></li>
        <li><Link to="/ator">Ator</Link></li>
        <li><Link to="/diretor">Diretor</Link></li>
        <li><Link to="/filme">Filme</Link></li>
      </ul>
    </nav>
    </div>
    </div>
    
  );
}

export default Menu;
