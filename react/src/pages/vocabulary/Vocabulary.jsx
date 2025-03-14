// Использование MobX для получения и управления данными.
// Замена использования useState на MobX-стор
import { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import wordStore from '../../stores/store'; // Импорт MobX стора
import './Vocabulary.module.scss';

const Vocabulary = observer(() => {
    const [editingRow, setEditingRow] = useState(null); // Состояние для редактируемой строки
    const [editValues, setEditValues] = useState({}); // Состояние для значений редактирования
    const [errors, setErrors] = useState({}); // Состояние для ошибок валидации
    const [newWord, setNewWord] = useState({ english: '', transcription: '', russian: '', tags: '' }); // Состояние для нового слова

    // Загружаем слова с сервера при монтировании компонента
    useEffect(() => {
        wordStore.fetchWords(); // Используем метод fetchWords из стора
    }, []);

    // Функция для обработки клика по кнопке редактирования
    const handleEditClick = (id, word) => {
        setEditingRow(id);
        setEditValues(word);
        setErrors({});
    };

    // Функция для обработки отмены редактирования
    const handleCancelClick = () => {
        setEditingRow(null);
        setEditValues({});
        setErrors({});
    };

    // Функция для обработки изменений в полях редактирования
    const handleChange = (e, field) => {
        setEditValues({ ...editValues, [field]: e.target.value });

        setErrors((prev) => ({
            ...prev,
            [field]: e.target.value.trim() === '',
        }));
    };

    // Функция для проверки валидности формы редактирования
    const isFormValid = () => {
        return Object.values(editValues).every(value => value.trim() !== '');
    };

    // Функция для обработки сохранения изменений
    const handleSaveClick = (id) => {
        if (!isFormValid()) {
            setErrors({
                english: !editValues.english.trim(),
                transcription: !editValues.transcription.trim(),
                russian: !editValues.russian.trim(),
                tags: !editValues.tags.trim(),
            });
            return;
        }

        // Используем метод updateWordOnServer из стора для обновления слова на сервере
        wordStore.updateWordOnServer(id, editValues)
            .then(() => {
                wordStore.fetchWords(); // Обновляем список слов после успешного обновления
                setEditingRow(null);
            })
            .catch((error) => {
                console.error("Ошибка при обновлении слова на сервере", error);
            });
    };

    // Функция для обработки удаления слова
    const handleDeleteClick = (id) => {
        wordStore.deleteWordOnServer(id)
            .then(() => {
                wordStore.fetchWords(); // Обновляем список слов после удаления
            })
            .catch((error) => {
                console.error("Ошибка при удалении слова", error);
            });
    };

    // Функция для обработки добавления нового слова
    const handleAddWord = () => {
        if (Object.values(newWord).every(field => field.trim() !== '')) {
            // Используем метод saveWord из стора для добавления нового слова
            wordStore.saveWord(newWord)
                .then(() => {
                    wordStore.fetchWords(); // Обновляем список слов после добавления
                    setNewWord({ english: '', transcription: '', russian: '', tags: '' });
                })
                .catch((error) => {
                    console.error("Ошибка при добавлении слова на сервер", error);
                });
        } else {
            setErrors({
                english: !newWord.english.trim(),
                transcription: !newWord.transcription.trim(),
                russian: !newWord.russian.trim(),
                tags: !newWord.tags.trim(),
            });
        }
    };

    return (
        <div className="vocabulary">
            <h2>Словарь слов для игры EnFlame</h2>
            <div className="add-word-form">
                <input
                    type="text"
                    placeholder="English"
                    value={newWord.english}
                    onChange={(e) => setNewWord({ ...newWord, english: e.target.value })}
                    className={errors.english ? 'error' : ''}
                />
                <input
                    type="text"
                    placeholder="Transcription"
                    value={newWord.transcription}
                    onChange={(e) => setNewWord({ ...newWord, transcription: e.target.value })}
                    className={errors.transcription ? 'error' : ''}
                />
                <input
                    type="text"
                    placeholder="Russian"
                    value={newWord.russian}
                    onChange={(e) => setNewWord({ ...newWord, russian: e.target.value })}
                    className={errors.russian ? 'error' : ''}
                />
                <input
                    type="text"
                    placeholder="Tags"
                    value={newWord.tags}
                    onChange={(e) => setNewWord({ ...newWord, tags: e.target.value })}
                    className={errors.tags ? 'error' : ''}
                />
                <button onClick={handleAddWord}>Добавить слово</button>
            </div>
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
                    {wordStore.words.map((word) => (
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
                                        <button onClick={handleCancelClick}>❌ Отменить</button>
                                    </td>
                                    <td>
                                        <button onClick={() => handleDeleteClick(word.id)}>🗑 Удалить</button>
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
                                        <button onClick={() => handleDeleteClick(word.id)}>🗑 Удалить</button>
                                    </td>
                                </>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
});

export default Vocabulary;