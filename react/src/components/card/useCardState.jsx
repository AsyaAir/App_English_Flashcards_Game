import { useState, useCallback } from 'react';

export const useCardState = (wordRussian, onCorrectAnswer) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [userTranslation, setUserTranslation] = useState('');
    const [isCorrect, setIsCorrect] = useState(null);
    const [attempts, setAttempts] = useState(0);

    const handleInputChange = useCallback((e) => {
        setUserTranslation(e.target.value);
    }, []);

    const handleCheckTranslation = useCallback(() => {
        setIsFlipped(true);

        if (userTranslation.trim().toLowerCase() === wordRussian.toLowerCase()) {
            setIsCorrect(true);
            setAttempts(0);
            onCorrectAnswer();
        } else {
            setIsCorrect(false);
            setAttempts(prev => prev + 1);
        }
    }, [userTranslation, wordRussian, onCorrectAnswer]);

    const handleTryAgain = useCallback(() => {
        if (attempts < 3) {
            setIsFlipped(false);
            setUserTranslation('');
            setIsCorrect(null);
        }
    }, [attempts]);

    const handleShowCorrectAnswer = useCallback(() => {
        setIsFlipped(true);
    }, []);

    return {
        isFlipped,
        userTranslation,
        isCorrect,
        attempts,
        handleInputChange,
        handleCheckTranslation,
        handleTryAgain,
        handleShowCorrectAnswer
    };
};