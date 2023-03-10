import styled, { css } from 'styled-components';

export const MainTitle = styled.h3`
    padding: 15px 0;
    font-weight: 700;
    font-size: 20px;
    line-height: 24px;

    ${({ theme }) => theme.media.mobile`
        padding: 12px 0;
        font-size: 18px;
        line-height: 22px;
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

export const CommentAndReplyList = css`
    dt {
        font-size: 18px;
        line-height: 24px;
        color: #000000;

        b {
            display: flex;
            justify-content: flex-start;
            gap: 5px;
            color: #323232;
            margin-bottom: 5px;

            em {
                display: inline-block;
                margin-left: 5px;
                color: #666666;
                font-weight: 400;
                font-size: 14px;
            }
        }

        p {
            font-size: 18px;
            line-height: 24px;
            font-weight: 400;
            color: #000000;
            word-break: break-all;
            white-space: pre-wrap;
        }
    }

    dd {
        display: flex;
        gap: 15px;
        font-size: 14px;
        font-weight: 500;
        align-items: center;

        > em {
            color: #666666;
            cursor: pointer;
        }

        .like_box {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 5px;
        }
    }
`;
