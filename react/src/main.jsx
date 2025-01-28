import { StrictMode } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import ReactDOM from "react-dom/client";
import './index.css';
import App from './App.jsx';

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <StrictMode>
    <Router>
      <App />
    </Router>
  </StrictMode>,
);