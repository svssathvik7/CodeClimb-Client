import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { userContextProvider } from './Contexts/UserContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <userContextProvider.Provider>
      <App />
      </userContextProvider.Provider>
    </BrowserRouter>
  </React.StrictMode>
);
