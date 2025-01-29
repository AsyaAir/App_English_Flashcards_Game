import { StrictMode } from 'react';
import { BrowserRouter } from "react-router";
import ReactDOM from "react-dom/client";
import './styles/index.scss';
import App from './App.jsx';

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);