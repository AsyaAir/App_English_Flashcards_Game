import { useState } from 'react';
import Header from './components/Header';
import Home from './components/Home';
import Game from './components/Game';
import Footer from './components/Footer';
import './App.css';

const App = () => {

  return (
    <>
      <Header />
      <main>
        <Home />
        <Game />
      </main>
      <Footer />
    </>
  );
};

export default App;
