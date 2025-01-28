import './Vocabualary.module.scss';

function Vocabualary() {
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
                            </select>
                        </td>
                        <td>
                            <select id="transcriptionSelect">
                                <option value="">Select...</option>
                            </select>
                        </td>
                        <td>
                            <select id="russianSelect">
                                <option value="">Select...</option>
                            </select>
                        </td>
                        <td>
                            <select id="tagsSelect">
                                <option value="">Select...</option>
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