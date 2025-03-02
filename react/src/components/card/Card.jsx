// Каждая карточка будет содержать слово на английском языке, транскрипцию и поле для ввода перевода. 
// После того, как пользователь введет перевод, и нажмет кнопку “Проверить”, 
// она будет переворачивать карточку, и на её месте будет отображаться перевод на русском. 
// Для этого будет использоваться состояние для отображения перевода.
// Чтобы автоматически устанавливать фокус на кнопку “Проверить” при рендере новой карточки, использую useEffect в Card.jsx с useRef

import './Card.module.scss';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useCardState } from './useCardState';

const Card = ({ wordEnglish, transcription, wordRussian, onCorrectAnswer, onNextCard }) => {
    const {
        isFlipped,
        userTranslation,
        isCorrect,
        attempts,
        handleInputChange,
        handleCheckTranslation,
        handleTryAgain,
    } = useCardState(wordRussian, onCorrectAnswer);

    const [timer, setTimer] = useState(null); // Состояние для таймера
    const [showCorrectAnswer, setShowCorrectAnswer] = useState(false); // Новое состояние для правильного ответа

    // Функция для автоматического переключения карточки через 15 секунд, если 3 неправильных ответа
    useEffect(() => {
        if (attempts === 3 && !isCorrect) {
            const timeout = setTimeout(() => {
                onNextCard(); // Переход к следующей карточке через 15 секунд
            }, 15000);
            setTimer(timeout);
        }

        // Очистка таймера, если карточка была перевернута или компонента была размонтирована
        return () => {
            clearTimeout(timer);
        };
    }, [attempts, isCorrect, onNextCard, timer]); // Добавляем timer в зависимости

    // Обработчик нажатия на кнопку "Правильный перевод"
    const handleShowCorrectTranslation = () => {
        setShowCorrectAnswer(true);
    };

    return (
        <div className={`card ${isFlipped ? 'flipped' : ''}`}>
            {!isFlipped ? (
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
                    <button onClick={handleCheckTranslation}>
                        Проверить
                    </button>
                </div>
            ) : (
                <div className="card-back">
                    {isCorrect === false && (
                        <>
                            <p className="user-translation">Ваш ответ: {userTranslation}</p>
                            {attempts < 3 ? (
                                <button onClick={handleTryAgain}>Неверно, попробуйте снова</button>
                            ) : (
                                <button onClick={handleShowCorrectTranslation}>Правильный перевод</button>
                            )}
                        </>
                    )}
                    {isCorrect === true && <p className="translation">Правильный перевод: {wordRussian}</p>}
                    {showCorrectAnswer && (
                        <div className="card-back-2">
                            <p>Ваш перевод: {userTranslation}</p>
                            <p>Правильный перевод: {wordRussian}</p>
                        </div>
                    )}
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
    onNextCard: PropTypes.func.isRequired,
};

export default Card;