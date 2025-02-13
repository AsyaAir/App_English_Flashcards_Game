import { useEffect, useState } from 'react';
import './Vocabulary.module.scss';

function Vocabulary() {
    const [words, setWords] = useState([]);
    const [editingRow, setEditingRow] = useState(null); // ID редактируемой строки
    const [editValues, setEditValues] = useState({}); // Значения в режиме редактирования

    // Загружаем данные из API
    useEffect(() => {
        fetch('http://itgirlschool.justmakeit.ru/api/words')
            .then(response => response.json())
            .then(data => setWords(data))
            .catch(error => console.error('Ошибка загрузки слов:', error));
    }, []);

    // Включить режим редактирования
    const handleEditClick = (id, word) => {
        setEditingRow(id);
        setEditValues(word); // Загружаем текущие данные в редактируемые поля
    };

    // Отмена редактирования
    const handleCancelClick = () => {
        setEditingRow(null);
        setEditValues({});
    };

    // Обновление значения в поле
    const handleChange = (e, field) => {
        setEditValues({ ...editValues, [field]: e.target.value });
    };

    // Сохранение изменений
    const handleSaveClick = (id) => {
        const updatedWords = words.map(word =>
            word.id === id ? { ...word, ...editValues } : word
        );
        setWords(updatedWords);
        setEditingRow(null);
    };

    return (
        <div className="vacabulary">
            <h2>Словарь слов для игры EnFLame</h2>
            <table className='table'>
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
                    {words.map(word => (
                        <tr key={word.id}>
                            {editingRow === word.id ? (
                                <>
                                    <td><input type="text" value={editValues.english} onChange={(e) => handleChange(e, 'english')} /></td>
                                    <td><input type="text" value={editValues.transcription} onChange={(e) => handleChange(e, 'transcription')} /></td>
                                    <td><input type="text" value={editValues.russian} onChange={(e) => handleChange(e, 'russian')} /></td>
                                    <td><input type="text" value={editValues.tags} onChange={(e) => handleChange(e, 'tags')} /></td>
                                    <td>
                                        <button onClick={() => handleSaveClick(word.id)}>💾 Сохранить</button>
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