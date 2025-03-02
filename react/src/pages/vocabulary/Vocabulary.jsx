import { useEffect, useState } from 'react';
import './Vocabulary.module.scss';

function Vocabulary() {
    const [words, setWords] = useState([]);
    const [editingRow, setEditingRow] = useState(null);
    const [editValues, setEditValues] = useState({});
    const [errors, setErrors] = useState({});

    useEffect(() => {
        fetch('http://itgirlschool.justmakeit.ru/api/words')
            .then(response => response.json())
            .then(data => setWords(data))
            .catch(error => console.error('Ошибка загрузки слов:', error));
    }, []);

    const handleEditClick = (id, word) => {
        setEditingRow(id);
        setEditValues(word);
        setErrors({});
    };

    const handleCancelClick = () => {
        setEditingRow(null);
        setEditValues({});
        setErrors({});
    };

    const handleChange = (e, field) => {
        setEditValues({ ...editValues, [field]: e.target.value });

        setErrors((prev) => ({
            ...prev,
            [field]: e.target.value.trim() === '',
        }));
    };

    const isFormValid = () => {
        return Object.values(editValues).every(value => value.trim() !== '');
    };

    const handleSaveClick = (id) => {
        if (!isFormValid()) {
            console.error('Ошибка: Все поля должны быть заполнены!');
            setErrors({
                english: !editValues.english.trim(),
                transcription: !editValues.transcription.trim(),
                russian: !editValues.russian.trim(),
                tags: !editValues.tags.trim(),
            });
            return;
        }

        const updatedWords = words.map(word =>
            word.id === id ? { ...word, ...editValues } : word
        );
        setWords(updatedWords);
        setEditingRow(null);
        console.log('Сохранено:', editValues);
    };

    return (
        <div className="vocabulary">
            <h2>Словарь слов для игры EnFlame</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>English</th>
                        <th>Transcription</th>
                        <th>Russian</th>
                        <th>Tags</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {words.map(word => (
                        <tr key={word.id}>
                            {editingRow === word.id ? (
                                <>
                                    <td>
                                        <input
                                            type="text"
                                            value={editValues.english}
                                            onChange={(e) => handleChange(e, 'english')}
                                            className={errors.english ? 'error' : ''}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            value={editValues.transcription}
                                            onChange={(e) => handleChange(e, 'transcription')}
                                            className={errors.transcription ? 'error' : ''}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            value={editValues.russian}
                                            onChange={(e) => handleChange(e, 'russian')}
                                            className={errors.russian ? 'error' : ''}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            value={editValues.tags}
                                            onChange={(e) => handleChange(e, 'tags')}
                                            className={errors.tags ? 'error' : ''}
                                        />
                                    </td>
                                    <td>
                                        <button onClick={() => handleSaveClick(word.id)} disabled={!isFormValid()}>💾 Сохранить</button>
                                        <button onClick={handleCancelClick}>❌ Отмена</button>
                                    </td>
                                </>
                            ) : (
                                <>
                                    <td>{word.english}</td>
                                    <td>{word.transcription}</td>
                                    <td>{word.russian}</td>
                                    <td>{word.tags}</td>
                                    <td>
                                        <button onClick={() => handleEditClick(word.id, word)}>✏️ Редактировать</button>
                                    </td>
                                    <td>
                                        <button>🗑️ Удалить</button>
                                    </td>
                                </>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Vocabulary;