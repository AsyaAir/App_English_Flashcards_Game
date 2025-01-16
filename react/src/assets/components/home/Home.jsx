import { useState } from 'react';

import './Home.css';

const Home = () => {

    return (
        <>
        <div>
            <form action="">
                <div>
                    <label htmlFor="">English</label>
                    <input type="text" />
                </div>
                <div>
                    <label htmlFor="">Transcription</label>
                    <input type="text" />
                </div>
                <div>
                    <label htmlFor="">Russian</label>
                    <input type="text" />
                </div>
                <div>
                    <label htmlFor="">Tags</label>
                    <input type="text" />
                </div>
                <div>
                    <button>Add</button>
                </div>
                <div>
                    <button>Clear</button>
                </div>
                
            </form>
        </div>
        <div></div>
        </>
    );
};

export default Home;