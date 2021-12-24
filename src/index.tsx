import React from 'react';
import ReactDOM from 'react-dom';

import { colors } from '@atlaskit/theme';
import { css, Global } from '@emotion/react';
import { ModalManager } from 'components/generic';
import { ModalContextProvider } from 'contexts/ModalContext';

import App from './App';
import reportWebVitals from './reportWebVitals';

const GlobalStyle = css`
  body {
    margin: 0;
    height: 100vh;
    background: ${colors.DN10};
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
  <>
    <Global styles={GlobalStyle} />
    <ModalContextProvider>
      <ModalManager />
      <App />
    </ModalContextProvider>
  </>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
