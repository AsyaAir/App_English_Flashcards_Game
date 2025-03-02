// Cоздание родительского компонента, который будет отвечать за отображение массива карточек 
// и перелистывание их вперед-назад. 
// Компонент будет получать массив слов через props и управлять индексом текущей карточки.

import './CardDeck.module.scss';
import Card from '../card/Card';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
// импорт MobX store
import wordStore from '../../stores/store'; 

const CardDeck = observer(({ currentIndex, goToNextCard, goToPreviousCard, onCorrectAnswer }) => {
    const words = wordStore.words; // Получаем слова из MobX store

    return (
        <div className="card-deck">
            <div className="card-wrapper">
                <div className="card-wrapper__left-button">
                    <button
                        onClick={goToPreviousCard}
                        className="nav-btn"
                        disabled={currentIndex === 0}
                    >
                        Предыдущая <br />←
                    </button>
                </div>
                <div className="card-container">
                    <Card
                        key={currentIndex} // Используем currentIndex как ключ для правильного рендеринга
                        wordEnglish={words[currentIndex].english}
                        transcription={words[currentIndex].transcription}
                        wordRussian={words[currentIndex].russian}
                        onCorrectAnswer={onCorrectAnswer}
                        onNextCard={goToNextCard} // Передаем функцию для перехода к следующему слову
                    />
                </div>
                <div className="card-wrapper__right-button">
                    <button
                        onClick={goToNextCard}
                        className="nav-btn"
                        disabled={currentIndex === words.length - 1}
                    >
                        Следующая <br />→
                    </button>
                </div>
            </div>
        </div>
    );
});

CardDeck.propTypes = {
    currentIndex: PropTypes.number.isRequired,
    goToNextCard: PropTypes.func.isRequired,
    goToPreviousCard: PropTypes.func.isRequired,
    onCorrectAnswer: PropTypes.func.isRequired,
};

export default CardDeck;