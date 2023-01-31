import React from 'react';
import styled from 'styled-components';
import { CgChevronRight } from 'react-icons/cg';
import { MainTitle } from '@/common/style/common';

export default function Link() {
    const goToSite = (url: string) => {
        window.open(url);
    };

    return (
        <LinkWrap>
            <MainTitle>바로가기</MainTitle>
            <ul className="link_box">
                <li onClick={() => goToSite('https://www.youtube.com/')}>
                    <span>
                        <img src="/img/youtube.svg" alt="youtube" />
                        <span>Youtube</span>
                    </span>
                    <i>
                        <CgChevronRight />
                    </i>
                </li>
                <li onClick={() => goToSite('https://github.com/yoogukhyeon')}>
                    <span>
                        <img src="/img/git.svg" alt="git" />
                        <span>Github</span>
                    </span>

                    <i>
                        <CgChevronRight />
                    </i>
                </li>
                <li onClick={() => goToSite('https://cometruedream.tistory.com/')}>
                    <span>
                        <img src="/img/tistory.svg" alt="tistory" />
                        <span>Tistory</span>
                    </span>
                    <i>
                        <CgChevronRight />
                    </i>
                </li>
                <li onClick={() => goToSite('https://blog.naver.com/rnrgus012345')}>
                    <span>
                        <img src="/img/naver.webp" alt="naver" />
                        <span>Naver</span>
                    </span>
                    <i>
                        <CgChevronRight />
                    </i>
                </li>
            </ul>
        </LinkWrap>
    );
}

const LinkWrap = styled.div`
    .link_box {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 10px 15px;
        gap: 10px 15px;

        > li {
            width: 100%;
            height: 60px;
            padding: 0 18px;
            border-radius: 10px;
            font-size: 14px;
            color: #fff;
            line-height: 18px;
            box-shadow: 0 6px 6px rgb(0 0 0 / 25%);
            display: flex;
            align-items: center;
            justify-content: space-between;
            cursor: pointer;

            &:first-child {
                color: black;
            }

            &:nth-child(2) {
                background-color: black;
                color: #fff;
            }
            &:nth-child(3) {
                color: black;
            }
            &:last-child {
                background-color: #5ecd6a;

                > span > img {
                    width: 20px;
                }
            }

            i {
                font-size: 18px;
            }

            > span {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 10px;
                overflow: hidden;

                > img {
                    width: 30px;
                }
            }
        }

        ${({ theme }) => theme.media.mobile`
        grid-template-columns: repeat(1, 1fr);
    `}
    }
`;
