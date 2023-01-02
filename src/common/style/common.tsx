import styled, { css } from 'styled-components';

export const ContainerDiv = styled.div`
    max-width: 1040px;
    width: 100%;
    margin: 0 auto;
    padding: 0 20px;
`;

export const HeaderAndFooter = css`
    @media screen and (max-width: 768px) {
        li {
            font-size: 14px;
        }

        .logo {
            width: 35px;
        }
    }
`;

export const WordBreak = css`
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;
