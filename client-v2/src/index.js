import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/css/index.css';
import App from './App';
import { ContextProvider } from './context/ContextProvider';
import { SelectsContextProvider } from './context/SelectsContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ContextProvider>
      <SelectsContextProvider>
        <App />
    </SelectsContextProvider>
    </ContextProvider>
  </React.StrictMode>
);
