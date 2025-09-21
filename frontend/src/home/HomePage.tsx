import React from 'react';
import '../styles/modern.css'

const HomePage: React.FC = () => {
  return (
    <div className="home-container">
      <h1>Bem-vindo ao GuestList!</h1>
      <p>Gerencie convidados, eventos e muito mais de forma fácil e rápida.</p>
      <img src="/vite.svg" alt="Logo GuestList" className="home-logo" />
    </div>
  );
};

export default HomePage;