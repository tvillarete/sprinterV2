import React from 'react';
import ReactDOM from 'react-dom';

import { ModalManager } from 'components/generic';
import { ModalContextProvider } from 'contexts/ModalContext';
import { createGlobalStyle } from 'styled-components';

import App from './App';
import reportWebVitals from './reportWebVitals';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    background: #FAFBFC;
    height: 100vh;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
      Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
      'Segoe UI Symbol';
  }

  * {
    box-sizing: border-box;
    font-size: 16px;
  }
`;

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <ModalContextProvider>
      <ModalManager />
      <App />
    </ModalContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
