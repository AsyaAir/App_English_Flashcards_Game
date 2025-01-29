// Теперь давайте создадим родительский компонент, который будет отвечать за отображение массива карточек и перелистывание их вперед-назад. Компонент будет получать массив слов через props и управлять индексом текущей карточки.

import './CardDeck.module.scss';
import Card from '../card/Card';
import PropTypes from 'prop-types';

const CardDeck = ({ words, currentIndex, goToNextCard, goToPreviousCard }) => {
    return (
        <div className="card-deck">
            <div className="card-container">
                <Card
                    wordEnglish={words[currentIndex].english}
                    transcription={words[currentIndex].transcription}
                    wordRussian={words[currentIndex].russian}
                    translation={words[currentIndex].translation}
                />
            </div>
            <div className="navigation">
                <button onClick={goToPreviousCard} className="nav-btn">
                    ← Предыдущая
                </button>
                <button onClick={goToNextCard} className="nav-btn">
                    Следующая →
                </button>
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
            translation: PropTypes.string.isRequired,
        })
    ).isRequired,
    currentIndex: PropTypes.number.isRequired,
    goToNextCard: PropTypes.func.isRequired,
    goToPreviousCard: PropTypes.func.isRequired,
};

export default CardDeck;