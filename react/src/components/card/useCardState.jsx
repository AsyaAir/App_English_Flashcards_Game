import { useState, useCallback } from 'react';

export const useCardState = (wordRussian, onCorrectAnswer) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [userTranslation, setUserTranslation] = useState('');
    const [isCorrect, setIsCorrect] = useState(null);
    const [attempts, setAttempts] = useState(0);
    const [showCardBack2, setShowCardBack2] = useState(false);

  // Обработчик ввода
    const handleInputChange = useCallback((e) => {
        setUserTranslation(e.target.value);
    }, []);

  // Проверка перевода
    const handleCheckTranslation = useCallback(() => {
        setIsFlipped(true);

        if (userTranslation.trim().toLowerCase() === wordRussian.toLowerCase()) {
        setIsCorrect(true);
        setAttempts(0); // Сброс попыток при правильном ответе
        onCorrectAnswer(); // Уведомление родительского компонента о правильном ответе
        } else {
        setIsCorrect(false);
        setAttempts(prev => prev + 1); // Увеличиваем количество попыток
        }
    }, [userTranslation, wordRussian, onCorrectAnswer]);

  // Повторить попытку
    const handleTryAgain = useCallback(() => {
        if (attempts < 3) {
        setIsFlipped(false);
        setUserTranslation('');
        setIsCorrect(null);
        } else {
        setShowCardBack2(true); // Показать правильный ответ
        }
    }, [attempts]);

  // Показать правильный ответ
    const handleShowCorrectAnswer = useCallback(() => {
        setShowCardBack2(true);
    }, []);

  // Показать новое слово
    const handleShowNewCard = useCallback(() => {
        setShowCardBack2(false);
        setIsFlipped(false);
        setUserTranslation('');
        setIsCorrect(null);
        setAttempts(0);
    }, []);

    return {
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
    };
};