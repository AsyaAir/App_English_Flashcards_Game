// import { useState } from 'react';
import Header from './components/header/Header.jsx';
import Home from './components/home/Home.jsx';
import Game from './components/game/Game.jsx';
import Footer from './components/footer/Footer.jsx';
import './App.css';

const App = () => {

  return (
    <>
      <Header />
      <main className='main'>jjkjn
        <Home />
        <Game />
      </main>
      <Footer />
    </>
  );
};

export default App;
