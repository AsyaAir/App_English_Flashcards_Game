import './Home.module.scss';
import logo from '../../assets/images/pngegg.png';
import { Link } from 'react-router-dom'; // импорт Link

const Home = () => {

    return (
        <>
        <div>
            <h1>English Flashcards Game EnFLame</h1>
            <h2>Добро пожаловать в EnFlame — игру для изучения английских слов!</h2>
                <img src={logo} alt="Logo" />
            <p>EnFLame — это увлекательный способ пополнить словарный запас и улучшить память. Используйте карточки с новыми словами, проверяйте свои знания и отслеживайте прогресс. Учиться легко и интересно!</p>
        </div>
        <div>
                {/* Оборачиваем кнопку в компонент Link */}
                <Link to="/game">
                    <button type='button'>Lets START</button>
                </Link>
            </div>
        </>
    );
};

export default Home;