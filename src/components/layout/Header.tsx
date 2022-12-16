import React from 'react';
import styled, { css } from 'styled-components';
import { ContainerDiv } from '../../common/style/common';
import { HeaderAndFooter } from '../../common/style/common';
import { Routes, Route, NavLink } from 'react-router-dom';

export default function Header() {
    return (
        <HeaderWrap>
            <ContainerDiv>
                <div className="header_left">
                    <div className="logo">
                        <img src="/img/logo.svg" alt="LOGO" />
                    </div>
                    <ul>
                        <ActiveNavLink to="/">
                            <li>Home</li>
                        </ActiveNavLink>
                        <ActiveNavLink to="/boards">
                            <li>Community</li>
                        </ActiveNavLink>
                    </ul>
                </div>
                <ul className="header_right">
                    <li>
                        <img src="/img/icon.svg" alt="ICON" />
                    </li>
                </ul>
            </ContainerDiv>
        </HeaderWrap>
    );
}
const ActiveNavLink = styled(NavLink)`
    & {
        position: relative;
        transition: all 0.3s ease-in-out;
        &::after {
            content: '';
            display: block;
            position: absolute;
            left: 0;
            bottom: -7px;
            width: 0%;
            border-bottom: 2px solid #fff;
            transition: all 0.5s ease-in-out;
        }
    }

    &.active {
        color: #ff4c0e;
        &:hover {
            &::after {
                width: 100%;
                border-bottom-color: #ff4c0e;
            }
        }
    }

    &:hover {
        &::after {
            width: 100%;
        }
    }
`;

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
        gap: 1rem;
    }

    .header_left > ul > li {
        cursor: pointer;
    }

    .logo {
        width: 45px;
        margin-right: 15px;
        cursor: pointer;
        transition: all 0.8s ease-in-out;
    }

    .header_right li {
        width: 25px;
        color: #fff;
        cursor: pointer;
    }

    ${HeaderAndFooter}
    @media screen and (max-width: 380px) {
        .header_left ul {
            display: none;
        }
    } ;
`;

const ActiveStyle = css`
    color: #222;
`;
