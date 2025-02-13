import './Home.module.scss';
import logo from '../../assets/images/logo_EnFLame_3.jpg';
import StartButton from '../../components/buttons/start/StartButton.jsx';
import { NavLink } from 'react-router'; 


const Home = () => {

    return (
        <>
        <div className='home'>
            <h1>English Flashcards Game <br></br> EnFlame</h1>
            <h2>Добро пожаловать в 
                <span className="home__text-part"> En</span>
                <span className="home__text-part--middle">FL</span>
                <span className="home__text-part">ame </span>
                — игру с карточками для изучения английских слов!
            </h2>
            <img src={logo} alt="Logo" className='logo' />
            <p className='hometext'>EnFLame — это увлекательный способ пополнить словарный запас и улучшить память. <br></br> Используйте карточки с новыми словами, проверяйте свои знания и отслеживайте прогресс.  <br></br>Учиться легко и интересно!</p>
        </div>
        <div className='button'>
                {/* Оборачиваем кнопку в компонент NavLink */}
                <NavLink to="/game">
                    <StartButton />
                </NavLink>
            </div>
        </>
    );
};

export default Home;