// Cоздание родительского компонента, который будет отвечать за отображение массива карточек 
// и перелистывание их вперед-назад. 
// Компонент будет получать массив слов через props и управлять индексом текущей карточки.

import './CardDeck.module.scss';
import Card from '../card/Card';
import PropTypes from 'prop-types';

const CardDeck = ({ words, currentIndex, goToNextCard, goToPreviousCard, onCorrectAnswer }) => {
    return (
        <div className="card-deck">
            <div className="card-wrapper">
                <div className="card-wrapper__left-button">
                    <button onClick={goToPreviousCard} className="nav-btn" disabled={currentIndex === 0}>
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
                    <button onClick={goToNextCard} className="nav-btn" disabled={currentIndex === words.length - 1}>
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
    currentIndex: PropTypes.number.isRequired,
    goToNextCard: PropTypes.func.isRequired,
    goToPreviousCard: PropTypes.func.isRequired,
    onCorrectAnswer: PropTypes.func.isRequired,
};

export default CardDeck;