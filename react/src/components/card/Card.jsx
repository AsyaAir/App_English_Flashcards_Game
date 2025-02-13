// Каждая карточка будет содержать слово на английском языке, транскрипцию и поле для ввода перевода. После того, как пользователь введет перевод, и нажмет кнопку “Проверить”, она будет переворачивать карточку, и на её месте будет отображаться перевод на русском. Для этого будет использоваться состояние для отображения перевода.

import './Card.module.scss';
import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const Card = ({ wordEnglish, transcription, wordRussian, onCorrectAnswer, goToNextCard }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [userTranslation, setUserTranslation] = useState('');
    const [isCorrect, setIsCorrect] = useState(null);  // Флаг для проверки правильности ответа
    const checkButtonRef = useRef(null);

    const handleInputChange = (e) => {
        setUserTranslation(e.target.value);
    };

    const handleCheckTranslation = () => {
        setIsFlipped(true); // Переворачиваем карточку

        if (userTranslation.trim().toLowerCase() === wordRussian.toLowerCase()) {
            onCorrectAnswer(); // Увеличиваем счетчик
            setIsCorrect(true); // Ответ правильный
        } else {
            setIsCorrect(false); // Ответ неверный
        }
    };

    const handleTryAgain = () => {
        setIsFlipped(false); // Переворачиваем карточку обратно
        setUserTranslation(''); // Очищаем поле ввода
        setIsCorrect(null); // Сбрасываем состояние проверки
    };

    useEffect(() => {
        if (checkButtonRef.current) {
            checkButtonRef.current.focus();
        }
    }, [wordEnglish]);

    useEffect(() => {
        // Если ответ был правильный, переходим к следующей карточке после 10 секунд
        if (isCorrect === true) {
            const timer = setTimeout(() => {
                goToNextCard();
            }, 10000); // Через 10 секунд автоматически переходим к следующей карточке
            return () => clearTimeout(timer);
        }
    }, [isCorrect, goToNextCard]);

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
                        className={isCorrect === false ? 'incorrect' : ''} // Изменение стиля поля ввода, если ответ неверный
                    />
                    <button onClick={handleCheckTranslation} ref={checkButtonRef}>
                        Проверить
                    </button>
                </div>
            ) : (
                <div className="card-back">
                    <p className="word">{wordEnglish}</p>
                    <p className="transcription">{transcription}</p>
                    <p className="translation">Правильный перевод: {wordRussian}</p>
                    <p className="user-translation">Ваш ответ: {userTranslation}</p>
                    {isCorrect === false && (
                        <button onClick={handleTryAgain}>Неверно, попробуйте снова</button>
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
    goToNextCard: PropTypes.func.isRequired,
};

export default Card;