import './Game.module.scss';
import CardDeck from '../../components/carddeck/CardDeck';
import { useState, useEffect } from 'react';

const Game = () => {
    const [words, setWords] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        // Загрузка слов с API
        fetch('http://itgirlschool.justmakeit.ru/api/words')
            .then((response) => response.json())
            .then((data) => setWords(data));
    }, []);

    // Перелистнуть к следующей карточке
    const goToNextCard = () => {
        if (words.length > 0) {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
        }
    };

    // Перелистнуть к предыдущей карточке
    const goToPreviousCard = () => {
        if (words.length > 0) {
            setCurrentIndex(
                (prevIndex) => (prevIndex === 0 ? words.length - 1 : prevIndex - 1)
            );
        }
    };

    // Если слов нет
    if (words.length === 0) {
        return <p>Загрузка слов...</p>;
    }

    return (
        <div className="game">
            <h1>Игра с карточками</h1>
            <CardDeck
                words={words}
                currentIndex={currentIndex}
                goToNextCard={goToNextCard}
                goToPreviousCard={goToPreviousCard}
            />
        </div>
    );
};

export default Game;