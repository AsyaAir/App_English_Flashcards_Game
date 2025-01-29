import PropTypes from 'prop-types';
import './Results.module.scss';

const Results = ({ lastGameDate, totalGameTime, correctAnswers, totalWords }) => {
    return (
        <div className="results">
            <h2>Результаты игры</h2>
            <p>
                <strong>Дата последней игры:</strong>{' '}
                {lastGameDate ? new Date(lastGameDate).toLocaleString() : 'Неизвестно'}
            </p>
            <p>
                <strong>Общее время игры:</strong> {totalGameTime ? `${totalGameTime} секунд` : '0 секунд'}
            </p>
            <p>
                <strong>Правильные ответы:</strong> {correctAnswers} из {totalWords}
            </p>
        </div>
    );
};

Results.propTypes = {
    lastGameDate: PropTypes.string,
    totalGameTime: PropTypes.number,
    correctAnswers: PropTypes.number.isRequired,
    totalWords: PropTypes.number.isRequired,
};

export default Results;