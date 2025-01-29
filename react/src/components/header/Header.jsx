import { NavLink } from "react-router-dom";
import logo from '../../assets/images/pngegg.png';
import './Header.module.scss';

function Header() {
    return (
        <>
            <header className="header">
                <nav className="menu">
                    <ul className="menu__link">
                        <li className="menu__link menu__link_logo"><NavLink to="/">
                            <img src={logo} alt="Logo" className="logo__icon"></img>  
                            EnFLame
                            </NavLink>
                        </li>
                        <li className="menu__link menu__link_home"><NavLink to="/">home</NavLink></li>
                        <li className="menu__link menu__link_vocabualary"><NavLink to="/vocabualary">vocabualary</NavLink></li>
                        <li className="menu__link menu__link_game"><NavLink to="/game">game</NavLink></li>
                        <li className="menu__link menu__link_results"><NavLink to="/results">results</NavLink></li>
                    </ul>
                </nav>
            </header>
        </>
    );
}

export default Header;