import Header from './components/header/Header.jsx';
import Footer from './components/footer/Footer.jsx';
import { Routes, Route } from "react-router-dom";
import Home from './pages/home/Home';
import Vocabualary from './pages/vocabualary/Vocabualary';
import Game from './pages/game/Game';
import Results from './pages/results/Results';
import './App.css';

const App = () => {
    return (
        <>
            <Header />
            <main className='main'>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/vocabualary" element={<Vocabualary />} />
                    <Route path="/game" element={<Game />} />
                    <Route path="/results" element={<Results />} />
                </Routes>
            </main>
            <Footer />
        </>
    );
};

export default App;