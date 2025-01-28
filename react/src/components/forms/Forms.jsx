import './Forms.module.scss';

const Forms = () => {
    return (
        <>
            <div className="forms">
                <div className="table-container">
                    <table>
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
                                <td colSpan="2">
                                    <button id="addBtn">Add</button>
                                    <button id="clearBtn">Clear</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default Forms;