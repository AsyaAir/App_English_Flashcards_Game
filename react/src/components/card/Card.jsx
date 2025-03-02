// Каждая карточка будет содержать слово на английском языке, транскрипцию и поле для ввода перевода. 
// После того, как пользователь введет перевод, и нажмет кнопку “Проверить”, 
// она будет переворачивать карточку, и на её месте будет отображаться перевод на русском. 
// Для этого будет использоваться состояние для отображения перевода.

import './Card.module.scss';
import PropTypes from 'prop-types';
import { useCardState } from './useCardState';

const Card = ({
    wordEnglish,
    transcription,
    wordRussian,
    onCorrectAnswer
}) => {
    const {
        isFlipped,
        userTranslation,
        isCorrect,
        attempts,
        showCardBack2,
        handleInputChange,
        handleCheckTranslation,
        handleTryAgain,
        handleShowCorrectAnswer,
        handleShowNewCard
    } = useCardState(wordRussian, onCorrectAnswer);

    return (
        <div className={`card ${isFlipped || showCardBack2 ? 'flipped' : ''}`}>
        {!showCardBack2 ? (
            !isFlipped ? (
            <div className="card-front">
                <p className="word">{wordEnglish}</p>
                <p className="transcription">{transcription}</p>
                <input
                type="text"
                value={userTranslation}
                onChange={handleInputChange}
                placeholder="Введите перевод"
                className={isCorrect === false ? 'incorrect' : ''}
                />
                <button onClick={handleCheckTranslation}>Проверить</button>
            </div>
            ) : (
            <div className="card-back">
                <p className="word">{wordEnglish}</p>
                {isCorrect === false && (
                <>
                    <p className="user-translation">Ваш ответ: {userTranslation}</p>
                    {attempts < 3 ? (
                    <button onClick={handleTryAgain}>Неверно, попробуйте снова</button>
                    ) : (
                    <button onClick={handleShowCorrectAnswer}>Правильный перевод</button>
                    )}
                </>
                )}
                {isCorrect === true && <p className="translation">Правильный перевод: {wordRussian}</p>}
            </div>
            )
        ) : (
            <div className="card-back-2">
            <p>Ваш перевод: {userTranslation}</p>
            <p>Правильный перевод: {wordRussian}</p>
            {attempts < 3 && <button onClick={handleShowNewCard}>Показать новое слово</button>}
            </div>
        )}
        </div>
    );
};

Card.propTypes = {
    wordEnglish: PropTypes.string.isRequired,
    transcription: PropTypes.string.isRequired,
    wordRussian: PropTypes.string.isRequired,
    onCorrectAnswer: PropTypes.func.isRequired,
};

export default Card;