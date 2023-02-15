import React from 'react';
import styled, { css } from 'styled-components';
import { NavLink } from 'react-router-dom';

export default function Nav() {
    return (
        <ul>
            <ActiveNavLink to="/">
                <li>메인</li>
            </ActiveNavLink>
            <ActiveNavLink to="/boards">
                <li>커뮤니티</li>
            </ActiveNavLink>
            <ActiveNavLink to="/football-news">
                <li>축구 소식통</li>
            </ActiveNavLink>
        </ul>
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
