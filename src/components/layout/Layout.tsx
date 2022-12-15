import React from 'react';
import Header from './Header';
import Footer from './Footer';
import styled from 'styled-components';
interface IProps {
    children: React.ReactNode;
}

const Main = styled.div`
    min-height: calc(100vh - 180px);
`;

export default function Layout({ children }: IProps) {
    return (
        <div>
            <Header />
            <main>{children}</main>
            <Footer />
        </div>
    );
}
