import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { GlobalStyle } from './common/style/global-style';
import theme from './common/style/theme';
import { ThemeProvider } from './common/style/themed-components';
import { BrowserRouter } from 'react-router-dom';
ReactDOM.render(
    <>
        <GlobalStyle />
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ThemeProvider>
    </>,
    document.getElementById('root'),
);
