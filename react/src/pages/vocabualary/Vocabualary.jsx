import { useEffect, useState } from 'react';
import './Vocabualary.module.scss';

function Vocabualary() {
    const [words, setWords] = useState([]);
    
    // Загружаем данные из API при монтировании компонента
    useEffect(() => {
        fetch('http://itgirlschool.justmakeit.ru/api/words')
            .then(response => response.json())
            .then(data => setWords(data))
            .catch(error => console.error('Error fetching words:', error));
    }, []);
    
    // Функция для заполнения селектов
    const getUniqueValues = (field) => {
        const uniqueValues = [...new Set(words.map(word => word[field]))];
        return uniqueValues;
    };

    return (
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>English / Английский</th>
                        <th>Transcription / Транскрипция</th>
                        <th>Russian / Русский</th>
                        <th>Tags / Категория</th>
                        <th>Edit / Исправить</th>
                        <th>Delete / Удалить</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="input-row">
                        <td>
                            <select id="englishSelect">
                                <option value="">Select...</option>
                                {getUniqueValues('english').map((english, index) => (
                                    <option key={index} value={english}>
                                        {english}
                                    </option>
                                ))}
                            </select>
                        </td>
                        <td>
                            <select id="transcriptionSelect">
                                <option value="">Select...</option>
                                {getUniqueValues('transcription').map((transcription, index) => (
                                    <option key={index} value={transcription}>
                                        {transcription}
                                    </option>
                                ))}
                            </select>
                        </td>
                        <td>
                            <select id="russianSelect">
                                <option value="">Select...</option>
                                {getUniqueValues('russian').map((russian, index) => (
                                    <option key={index} value={russian}>
                                        {russian}
                                    </option>
                                ))}
                            </select>
                        </td>
                        <td>
                            <select id="tagsSelect">
                                <option value="">Select...</option>
                                {getUniqueValues('tags').map((tags, index) => (
                                    <option key={index} value={tags}>
                                        {tags}
                                    </option>
                                ))}
                            </select>
                        </td>
                        <td>
                            <button id="addBtn">Add</button>
                        </td>
                        <td>
                            <button id="clearBtn">Clear</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Vocabualary;