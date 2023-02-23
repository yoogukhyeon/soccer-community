import React from 'react';
import styled from 'styled-components';
import { ContainerDiv } from '@/common/style/common';
import { HeaderAndFooter } from '@/common/style/common';
import { useNavigate } from 'react-router-dom';
export default function Footer() {
    const navigate = useNavigate();
    const goToHome = () => {
        navigate('/');
    };
    return (
        <FooterWrap>
            <ContainerDiv>
                <div className="logo_box">
                    <span className="logo" onClick={goToHome}>
                        <img src="/img/logo.png" alt="LOGO" />
                    </span>
                </div>
                <div className="info_box">
                    <ul>
                        <li>© 2023 F&FK LTD All Rights Reserved.</li>
                        <li>F&FK 운영자: rnrgus5897@gmail.com</li>
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
        width: 50px;
        cursor: pointer;
        transition: all 0.8s ease-in-out;

        > img {
            width: 100%;
            height: auto;
        }
    }

    .info_box {
        margin: 15px 0;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
    }

    .info_box li {
        letter-spacing: 0.5px;
        line-height: 26px;
    }

    ${HeaderAndFooter}
`;
