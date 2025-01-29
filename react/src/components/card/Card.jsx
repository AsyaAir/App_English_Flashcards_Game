// Каждая карточка будет содержать слово на английском языке, транскрипцию и поле для ввода перевода. После того, как пользователь введет перевод, и нажмет кнопку “Проверить”, она будет переворачивать карточку, и на её месте будет отображаться перевод на русском. Для этого будет использоваться состояние для отображения перевода.

import './Card.module.scss';
import { useState } from 'react';
import PropTypes from 'prop-types';


const Card = ({ wordEnglish, transcription, wordRussian, translation, onCorrectAnswer }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [userTranslation, setUserTranslation] = useState('');
    const [isTranslationVisible, setIsTranslationVisible] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    const handleInputChange = (e) => {
        setUserTranslation(e.target.value);
    };

    const handleCheckTranslation = () => {
        if (userTranslation.trim().toLowerCase() === wordRussian.toLowerCase()) {
            setIsFlipped(true);
            setIsTranslationVisible(true);
            setIsChecked(true);
            onCorrectAnswer(); // Вызываем callback для правильного ответа
        }
    };

    return (
        <div className={`card ${isFlipped ? 'flipped' : ''}`}>
            <div className="card-front">
                <p className="word">{wordEnglish}</p>
                <p className="transcription">{transcription}</p>
                <input
                    type="text"
                    value={userTranslation}
                    onChange={handleInputChange}
                    placeholder="Введите перевод"
                />
                {!isChecked && (
                    <button onClick={handleCheckTranslation}>Проверить</button>
                )}
            </div>
            {isTranslationVisible && (
                <div className="card-back">
                    <p className="translation">{translation}</p>
                </div>
            )}
        </div>
    );
};

Card.propTypes = {
    wordEnglish: PropTypes.string.isRequired,
    transcription: PropTypes.string.isRequired,
    wordRussian: PropTypes.string.isRequired,
    translation: PropTypes.string.isRequired,
    onCorrectAnswer: PropTypes.func.isRequired,
};

export default Card;