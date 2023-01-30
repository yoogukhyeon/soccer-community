import React from 'react';
import styled from 'styled-components';
import { ContainerDiv } from '@/common/style/common';
import { HeaderAndFooter } from '@/common/style/common';

export default function Footer() {
    return (
        <FooterWrap>
            <ContainerDiv>
                <div className="logo_box">
                    <span className="logo">
                        <img src="/img/logo.svg" alt="LOGO" />
                    </span>
                </div>
                <div className="info_box">
                    <ul>
                        <li>React Project</li>
                        <li>Make Something You Can</li>
                    </ul>
                </div>
            </ContainerDiv>
        </FooterWrap>
    );
}

const FooterWrap = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background-color: #29293f;
    color: #fff;
    padding: 20px 0;

    .logo {
        display: inline-block;
        width: 45px;
        cursor: pointer;
        transition: all 0.8s ease-in-out;
    }

    .info_box {
        margin: 10px 0;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
    }

    .info_box li {
        line-height: 21px;
    }

    ${HeaderAndFooter}
`;
