import React from 'react';
import App from '@/App';
import { GlobalStyle } from '@/common/style/global-style';
import theme from '@/common/style/theme';
import { ThemeProvider } from '@/common/style/themed-components';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { createRoot } from 'react-dom/client';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
    <>
        <GlobalStyle />
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <HelmetProvider>
                    <App />
                </HelmetProvider>
            </BrowserRouter>
        </ThemeProvider>
    </>,
);
