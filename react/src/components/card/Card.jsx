// Каждая карточка будет содержать слово на английском языке, транскрипцию и поле для ввода перевода. После того, как пользователь введет перевод, и нажмет кнопку “Проверить”, она будет переворачивать карточку, и на её месте будет отображаться перевод на русском. Для этого будет использоваться состояние для отображения перевода.

import './Card.module.scss';
import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const Card = ({ wordEnglish, transcription, wordRussian, onCorrectAnswer, goToNextCard }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [userTranslation, setUserTranslation] = useState('');
    const checkButtonRef = useRef(null);

    const handleInputChange = (e) => {
        setUserTranslation(e.target.value);
    };

    const handleCheckTranslation = () => {
        setIsFlipped(true); // Переворачиваем карточку

        if (userTranslation.trim().toLowerCase() === wordRussian.toLowerCase()) {
            onCorrectAnswer(); // Увеличиваем счетчик
        }

        setTimeout(() => {
            setIsFlipped(false); // Переворачиваем обратно
            setUserTranslation(''); // Очищаем поле ввода
            goToNextCard(); // Переход к следующей карточке
        }, 10000); // Через 10 секунд автоматически переходит к следующей карточке
    };

    useEffect(() => {
        if (checkButtonRef.current) {
            checkButtonRef.current.focus();
        }
    }, [wordEnglish]);

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