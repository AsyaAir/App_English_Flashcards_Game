// import Card from '../../components/card/Card.jsx';
import './Game.module.scss';

const Game = () => {

    return (
        <>
        <div className="game">
            <div className="game-container">
                <div className="card">
                <div className="card-content">
                    <p className="word-russian">Слово на русском</p>
                    <input type="text" id="input-translation" placeholder="Введите перевод" />
                    <button id="show-btn">Show</button>
                </div>
                <div className="card-back">
                    <p className="word-english">English Translation</p>
                </div>
                </div>

                <div className="navigation">
                <button id="prev-btn" className="nav-btn">←</button>
                <button id="next-btn" className="nav-btn">→</button>
                </div>

                <div className="counter">
                <p>Learned Words: <span id="learned-count">0</span></p>
                </div>
            </div>
        </div>
        </>
    );
};

export default Game;