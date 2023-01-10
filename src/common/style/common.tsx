import styled, { css } from 'styled-components';

export const MainTitle = styled.h3`
    padding: 15px 0;
    font-weight: 700;
    font-size: 20px;
    line-height: 24px;

    ${({ theme }) => theme.media.mobile`
        padding: 12px 0;
        font-size: 17px;
        line-height: 21px;
    `}
`;

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
