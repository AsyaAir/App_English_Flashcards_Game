import './Game.module.scss';
import CardDeck from '../../components/carddeck/CardDeck';
import { useState, useEffect } from 'react';

const Game = () => {
    const [words, setWords] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [learnedWordsCount, setLearnedWordsCount] = useState(0);
    const [totalWords, setTotalWords] = useState(0); // Всего слов

    useEffect(() => {
        fetch('http://itgirlschool.justmakeit.ru/api/words')
            .then((response) => response.json())
            .then((data) => {
                setWords(data);
                setTotalWords(data.length); // Устанавливаем количество слов
            });
    }, []);

    const goToNextCard = () => {
        if (words.length > 0) {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
        }
    };

    const goToPreviousCard = () => {
        if (words.length > 0) {
            setCurrentIndex(
                (prevIndex) => (prevIndex === 0 ? words.length - 1 : prevIndex - 1)
            );
        }
    };

    // Увеличение счетчика изученных слов
    const handleCorrectAnswer = () => {
        setLearnedWordsCount((prevCount) => prevCount + 1);
    };

    if (words.length === 0) {
        return <p>Загрузка слов...</p>;
    }

    return (
        <div className="game">
            <h1>Игра с карточками EnFLame</h1>
            <CardDeck
                words={words}
                currentIndex={currentIndex}
                goToNextCard={goToNextCard}
                goToPreviousCard={goToPreviousCard}
                onCorrectAnswer={handleCorrectAnswer}
            />
            <p className="correctanswers">
                Изучено слов: {learnedWordsCount} из {totalWords}
            </p>
        </div>
    );
};

export default Game;