import React from 'react';
import styled, { css } from 'styled-components';
import { ContainerDiv } from '@/common/style/common';
import { HeaderAndFooter } from '@/common/style/common';
import { useNavigate, useLocation } from 'react-router-dom';
import Nav from '../common/Nav';
import { useAtom } from 'jotai';
import authAtom from '@/stores/authAtom';
import Cookies from 'universal-cookie';
export default function Header() {
    const [auth] = useAtom(authAtom);
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const goToHome = () => {
        navigate('/');
    };

    const goToLogin = () => {
        navigate('/user/sign-in', { state: pathname });
    };

    const goToLogOut = () => {
        const cookies = new Cookies();

        if (confirm('로그아웃 하시겠습니까?')) {
            cookies.remove('access_token', { path: '/',  domain: `${process.env.REACT_APP_DOMAIN}`, });
            cookies.remove('refresh_token', { path: '/',  domain: `${process.env.REACT_APP_DOMAIN}`, });
            navigate('/');
        }
    };

    return (
        <HeaderWrap>
            <ContainerDiv>
                <div className="header_left">
                    <div className="logo" onClick={goToHome}>
                        <img src="/img/logo.png" alt="LOGO" />
                    </div>
                    <Nav />
                </div>
                <ul className="header_right">
                    {auth?.accessToken ? (
                        <li onClick={goToLogOut}>
                            <img src="/img/logout.svg" alt="ICON" />
                        </li>
                    ) : (
                        <li onClick={goToLogin}>
                            <img src="/img/icon.svg" alt="ICON" />
                        </li>
                    )}
                </ul>
            </ContainerDiv>
        </HeaderWrap>
    );
}

const HeaderWrap = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 70px;
    background-color: #29293f;
    color: #fff;

    > div {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .header_left {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 15px;
    }

    .header_left > ul {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 16px;
    }

    .header_left > ul > li {
        cursor: pointer;
    }

    .logo {
        width: 50px;
        margin-right: 15px;
        cursor: pointer;
        transition: all 0.8s ease-in-out;

        > img {
            width: 100%;
            height: auto;
        }
    }

    .header_right li {
        width: 25px;
        color: #fff;
        cursor: pointer;

        img {
            width: 100%;
        }
    }

    ${HeaderAndFooter}
    @media screen and (max-width: 380px) {
        .header_left ul {
            display: none;
        }
    } ;
`;
