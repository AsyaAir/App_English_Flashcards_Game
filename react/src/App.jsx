import { useState } from 'react'
import './App.css'

function App() {

  return (
    <>
      <header>
        <h1>English Flashcards Game</h1> 
        <nav>
          <ul>
            <li>I love English</li>
            <li><button>Home</button></li>
            <li><button>Game</button></li>
          </ul>
        </nav>
      </header>

      <main>
        <div>
          <form action="">
            <input type="text" />
            <input type="text" />
            <input type="text" />
            <input type="text" />
            <button>Add</button>
            <button>Clear</button>
          </form>
        </div>
        <div>

        </div>
      </main>
      
      <footer></footer>

      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
