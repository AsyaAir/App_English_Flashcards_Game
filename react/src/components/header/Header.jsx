import { NavLink } from "react-router-dom";
import logo from '../../assets/images/logo_EnFLame_3.jpg';
import './Header.module.scss';

function Header() {
    return (
        <header className='header'>
            <div className="logo">
                <img src={logo} alt="Logo" className="logo__icon" />
                <span className="logo__text">EnFLame</span>
            </div>
            <nav className='menu'>
                <ul className="menu__link">
                    <li><NavLink to="/">home</NavLink></li>
                    <li><NavLink to="/vocabulary">vocabulary</NavLink></li>
                    <li><NavLink to="/game">game</NavLink></li>
                    <li><NavLink to="/results">results</NavLink></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;