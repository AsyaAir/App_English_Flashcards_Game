// Cоздание родительского компонента, который будет отвечать за отображение массива карточек 
// и перелистывание их вперед-назад. 
// Компонент будет получать массив слов через props и управлять индексом текущей карточки.

import './CardDeck.module.scss';
import Card from '../card/Card';
import PropTypes from 'prop-types';
import { useState } from 'react';

const CardDeck = ({ words }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [disableNavButtons, setDisableNavButtons] = useState(false);

    const goToNextCard = () => {
        if (currentIndex < words.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setDisableNavButtons(false); // Сбрасываем блокировку кнопок навигации
        }
    };

    const goToPreviousCard = () => {
        if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
        setDisableNavButtons(false); // Сбрасываем блокировку кнопок навигации
        }
    };

    const onCorrectAnswer = () => {
        setDisableNavButtons(false); // Снимаем блокировку кнопок, если перевод правильный
    };

    return (
        <div className="card-deck">
        <div className="card-wrapper">
            <div className="card-wrapper__left-button">
            <button
                onClick={goToPreviousCard}
                className="nav-btn"
                disabled={disableNavButtons}
            >
                Предыдущая <br />←
            </button>
            </div>
            <div className="card-container">
            <Card
                wordEnglish={words[currentIndex].english}
                transcription={words[currentIndex].transcription}
                wordRussian={words[currentIndex].russian}
                onCorrectAnswer={onCorrectAnswer}
                disableNavButtons={disableNavButtons} // Передаем состояние блокировки кнопок
            />
            </div>
            <div className="card-wrapper__right-button">
            <button
                onClick={goToNextCard}
                className="nav-btn"
                disabled={disableNavButtons}
            >
                Следующая <br />→
            </button>
            </div>
        </div>
        </div>
    );
    };

CardDeck.propTypes = {
    words: PropTypes.arrayOf(
        PropTypes.shape({
        english: PropTypes.string.isRequired,
        transcription: PropTypes.string.isRequired,
        russian: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default CardDeck;