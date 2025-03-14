// Fast Refresh в Vite/React работает корректно только при экспорте компонентов. 
// Контекст же технически не является компонентом, и это может вызвать проблемы с хот-релоадом.
// Поэтому, чтобы Fast Refresh работал корректно, нужно экспортировать провайдеры контекста.

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { WordsContext } from '@/contexts/WordsContext';

export const WordsProvider = ({ children }) => {
    const [words, setWords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWords = async () => {
            setError(null);
            try {
                const response = await fetch('/api/words'); // Относительный путь через прокси
                if (!response.ok) throw new Error('Ошибка загрузки слов');
                const data = await response.json();
                setWords(data.map(word => ({
                    id: word.id,
                    english: word.english,
                    transcription: word.transcription,
                    russian: word.russian,
                    tags: word.tags.split(", "), 
                    tags_json: JSON.parse(word.tags_json),
                })));
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchWords();
    }, []);

    const addWord = async (word) => {
        setError(null);
        try {
            const response = await fetch('/api/words', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(word),
            });
            if (!response.ok) throw new Error('Ошибка при добавлении слова');
            const newWord = await response.json();
            setWords((prevWords) => [...prevWords, newWord]);
        } catch (err) {
            setError(err.message);
        }
    };

    const updateWord = async (id, updatedWord) => {
        setError(null);
        try {
            const response = await fetch(`/api/words/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedWord),
            });
            if (!response.ok) throw new Error('Ошибка при обновлении слова');
            const updatedData = await response.json();
            setWords(prevWords =>
                prevWords.map(word => (word.id === id ? updatedData : word))
            );
        } catch (err) {
            setError(err.message);
        }
    };

    const deleteWord = async (id) => {
        setError(null);
        try {
            const response = await fetch(`/api/words/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Ошибка при удалении слова');
            setWords(prevWords => prevWords.filter(word => word.id !== id));
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <WordsContext.Provider value={{ words, totalWords: words.length, loading, error, addWord, updateWord, deleteWord }}>
            {children}
        </WordsContext.Provider>
    );
};

WordsProvider.propTypes = {
    children: PropTypes.node.isRequired,
};