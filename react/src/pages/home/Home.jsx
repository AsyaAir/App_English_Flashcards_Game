import './Home.module.scss';
import logo from '../../assets/images/pngegg.png';
import { NavLink } from 'react-router'; 


const Home = () => {

    return (
        <>
        <div className='home'>
            <h1>English Flashcards Game EnFLame</h1>
            <h2>Добро пожаловать в EnFlame — игру для изучения английских слов!</h2>
            <img src={logo} alt="Logo" className='logo' />
            <p>EnFLame — это увлекательный способ пополнить словарный запас и улучшить память. Используйте карточки с новыми словами, проверяйте свои знания и отслеживайте прогресс. Учиться легко и интересно!</p>
        </div>
        <div className='button'>
                {/* Оборачиваем кнопку в компонент NavLink */}
                <NavLink to="/game">
                    <button type='button' >Lets START</button>
                </NavLink>
            </div>
        </>
    );
};

export default Home;