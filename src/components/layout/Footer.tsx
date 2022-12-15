import React from 'react';
import styled from 'styled-components';

const FooterWrap = styled.div`
    width: 100%;
    height: 70px;
    background-color: #eee;
`;

export default function Footer() {
    return (
        <FooterWrap>
            <h1>This is Footer</h1>
        </FooterWrap>
    );
}
