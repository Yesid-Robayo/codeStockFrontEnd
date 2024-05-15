import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './redux/store';
import { MainProvider } from './context/MainContext';

/**
 * Creates a root React element and renders it into the specified container element.
 *
 * @param {string | HTMLElement} container - The container element or its ID where the React element will be rendered.
 * @returns {ReactDOM.Root} - The root React element.
 */
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <MainProvider>
        <App />
      </MainProvider>

    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
