import { NavLink } from "react-router";
import logo from '../../assets/images/logo_EnFLame_3.jpg';
import './Header.module.scss';

function Header() {
    return (
        <header className='header'>
            <div className="logo">
                <NavLink to="/" className="logo__icon">
                    <img src={logo} alt="Logo" className="logo__icon" />
                </NavLink>
                <NavLink to="/" className="logo__text">
                    <span className="logo__text-part">En</span>
                    <span className="logo__text-part--middle">FL</span>
                    <span className="logo__text-part">ame</span>
                </NavLink>
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