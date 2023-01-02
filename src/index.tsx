import React from 'react';
import App from '@/App';
import { GlobalStyle } from '@/common/style/global-style';
import theme from '@/common/style/theme';
import { ThemeProvider } from '@/common/style/themed-components';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { createRoot } from 'react-dom/client';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const container = document.getElementById('root');
const root = createRoot(container!);
const queryClient = new QueryClient();

root.render(
    <>
        <GlobalStyle />
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <HelmetProvider>
                    <QueryClientProvider client={queryClient}>
                        <App />
                        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
                    </QueryClientProvider>
                </HelmetProvider>
            </BrowserRouter>
        </ThemeProvider>
    </>,
);
