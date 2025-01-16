import { useState } from 'react';

import './Header.css';

const Header = () => {

    return (
        <>
        <header>
            <h1>English Flashcards Game</h1> 
            <nav>
                <ul>
                    <li>I love English</li>
                    <li><a href='#'>Home</a></li>
                    <li><a href='#'>Game</a></li>
                </ul>
            </nav>
        </header>
        </>
    );
};

export default Header;