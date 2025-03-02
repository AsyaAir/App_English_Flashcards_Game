// подключение WordsProvider в корневой компонент, 
// чтобы контекст был доступен в любом месте приложения
import { WordsProvider } from '../src/pages/vocabulary/WordsContext.jsx'; 

import { useState, useEffect } from "react";
import Header from './components/header/Header.jsx';
import Footer from './components/footer/Footer.jsx';
import { Routes, Route } from "react-router";
import Home from './pages/home/Home';
import Vocabulary from './pages/vocabulary/Vocabulary';
import Game from './pages/game/Game';
import Results from './pages/results/Results';
import LoadingIndicator from './components/indicator/LoadingIndicator';
import './styles/App.scss';

const App = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Симуляция загрузки данных
        setTimeout(() => {
        setLoading(false);
        }, 3000); // 3 секунды
    }, []);

    return (
        <WordsProvider>
            <>
                <Header />
                <main className='main'>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/vocabulary" element={<Vocabulary />} />
                        <Route path="/game" element={<Game />} />
                        <Route path="/results" element={<Results />} />
                    </Routes>
                </main>
                <Footer />
            </>
            {loading ? <LoadingIndicator /> : <div>Контент загружен!</div>}
        </WordsProvider>
    );
};

export default App;