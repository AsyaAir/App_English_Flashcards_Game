// Создание context для управления коллекцией слов, 
// чтобы данные были доступны в любом месте приложения.

import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const WordsContext = createContext();

export const WordsProvider = ({ children }) => {
    const [words, setWords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://itgirlschool.justmakeit.ru/api/words')
            .then(response => response.json())
            .then(data => {
                setWords(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err);
                setLoading(false);
            });
    }, []);

    const addWord = (word) => {
        setWords(prevWords => [...prevWords, word]);
    };
    
    WordsProvider.propTypes = {
        children: PropTypes.node.isRequired,
    };
    const updateWord = (id, updatedWord) => {
        setWords(prevWords => prevWords.map(word => (word.id === id ? updatedWord : word)));
    };

    const deleteWord = (id) => {
        setWords(prevWords => prevWords.filter(word => word.id !== id));
    };

    return (
        <WordsContext.Provider value={{ words, loading, error, addWord, updateWord, deleteWord }}>
            {children}
        </WordsContext.Provider>
    );
};

WordsProvider.propTypes = {
    children: PropTypes.node.isRequired,
};