import React from 'react';
import Header from './Header';
import Footer from './Footer';
import styled from 'styled-components';
import { ContainerDiv } from '@/common/style/common';
interface IProps {
    children: React.ReactNode;
}

const Main = styled.div`
    min-height: calc(100vh - 180px);
    margin-bottom: 30px;
`;

export default function Layout({ children }: IProps) {
    return (
        <>
            <Header />
            <ContainerDiv>
                <Main>{children}</Main>
            </ContainerDiv>
            <Footer />
        </>
    );
}
