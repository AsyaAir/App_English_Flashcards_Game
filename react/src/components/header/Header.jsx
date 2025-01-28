import { NavLink } from "react-router-dom";
import logo from '../../assets/images/pngegg.png';
import './Header.module.scss';

function Header() {
    return (
        <header className="header">
            <nav className='menu'>
                <ul>
                    <li><NavLink to="/">
                        <img src={logo} alt="Logo" className="logo__icon"></img>  
                        EnFLame
                        </NavLink>
                    </li>
                    <li><NavLink to="/">home</NavLink></li>
                    <li><NavLink to="/vocabualary">vocabualary</NavLink></li>
                    <li><NavLink to="/game">game</NavLink></li>
                    <li><NavLink to="/results">results</NavLink></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;