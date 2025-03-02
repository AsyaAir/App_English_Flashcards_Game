// Использование MobX для получения и управления данными.
// Замена использования useState на MobX-стор
import { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
// импорт MobX store
import wordStore from '../../stores/store'; 
import './Vocabulary.module.scss';

const Vocabulary = observer(() => {
    const [editingRow, setEditingRow] = useState(null);
    const [editValues, setEditValues] = useState({});
    const [errors, setErrors] = useState({});
    const [newWord, setNewWord] = useState({ english: '', transcription: '', russian: '', tags: '' });

    // Загружаем слова с сервера при монтировании компонента
    useEffect(() => {
        wordStore.fetchWords();
    }, []);

    // Обрабатываем клик на редактирование
    const handleEditClick = (id, word) => {
        setEditingRow(id);
        setEditValues(word);
        setErrors({});
    };

    // Обрабатываем отмену редактирования
    const handleCancelClick = () => {
        setEditingRow(null);
        setEditValues({});
        setErrors({});
    };

    // Обрабатываем изменения в полях редактирования
    const handleChange = (e, field) => {
        setEditValues({ ...editValues, [field]: e.target.value });

        setErrors((prev) => ({
            ...prev,
            [field]: e.target.value.trim() === '',
        }));
    };

    // Проверка валидности формы для редактирования
    const isFormValid = () => {
        return Object.values(editValues).every(value => value.trim() !== '');
    };

    // Обрабатываем сохранение изменений
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

        // Отправляем изменения на сервер
        wordStore.updateWordOnServer(id, editValues)
            .then(() => {
                // После успешного обновления обновляем список слов
                wordStore.fetchWords();
                setEditingRow(null);
            })
            .catch((error) => {
                console.error("Ошибка при обновлении слова на сервере", error);
            });
    };

    // Обрабатываем удаление слова
    const handleDeleteClick = (id) => {
        wordStore.deleteWordOnServer(id)
            .then(() => {
                wordStore.fetchWords(); // Обновляем список после удаления
            })
            .catch((error) => {
                console.error("Ошибка при удалении слова", error);
            });
    };

    // Обрабатываем добавление нового слова
    const handleAddWord = () => {
        if (Object.values(newWord).every(field => field.trim() !== '')) {
            // Отправляем новое слово на сервер
            wordStore.saveWord(newWord)
                .then(() => {
                    // После успешного добавления обновляем список слов
                    wordStore.fetchWords();
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
                                        <button onClick={() => handleDeleteClick(word.id)}>🗑️ Удалить</button>
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