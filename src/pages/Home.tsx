import React from 'react';
import SwiperList from '../components/common/SwiperList';
import styled from 'styled-components';
import { CgChevronRight } from 'react-icons/cg';
import { MainTitle } from '@/common/style/common';
interface IItems {
    readonly img: string;
    readonly name: string;
}

export default function Home() {
    const swiperUseStatus = process.env.REACT_APP_SWIPER_USE;
    const items: IItems[] = [
        {
            img: 'https://png.pngtree.com/background/20210715/original/pngtree-website-banner-abstract-purple-blue-gradient-background-picture-image_1304964.jpg',
            name: '사진1',
        },
        {
            img: 'https://www.timeoutdubai.com/cloud/timeoutdubai/2021/09/11/udHvbKwV-IMG-Dubai-UAE-1.jpg',
            name: '사진2',
        },
        {
            img: 'https://miro.medium.com/max/1400/0*c43pw7UiQgpfjDCl.jpg',
            name: '사진3',
        },
    ];
    console.log(process.env.REACT_APP_SWIPER_USE);
    return (
        <MainWrap>
            {swiperUseStatus && <SwiperList lists={items} />}

            <div className="link_wrap">
                <MainTitle>바로가기</MainTitle>
                <ul className="link_box">
                    <li>
                        <span>
                            <img src="/img/youtube.svg" alt="youtube" />
                            <span>Youtube</span>
                        </span>
                        <i>
                            <CgChevronRight />
                        </i>
                    </li>
                    <li>
                        <span>
                            <img src="/img/git.svg" alt="git" />
                            <span>Github</span>
                        </span>

                        <i>
                            <CgChevronRight />
                        </i>
                    </li>
                    <li>
                        <span>
                            <img src="/img/naver.svg" alt="naver" />
                            <span>Tistory</span>
                        </span>
                        <i>
                            <CgChevronRight />
                        </i>
                    </li>
                    <li>
                        <span>
                            <img src="/img/naver.svg" alt="naver" />
                            <span>Naver</span>
                        </span>

                        <i>
                            <CgChevronRight />
                        </i>
                    </li>
                </ul>
            </div>
        </MainWrap>
    );
}

const MainWrap = styled.div`
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
            box-shadow: 0 4px 4px rgb(0 0 0 / 25%);
            display: flex;
            align-items: center;
            justify-content: space-between;

            &:first-child {
                color: black;
                background-color: #eedb49;
            }

            &:nth-child(2) {
                background-color: #5ecd6a;
            }
            &:nth-child(3) {
                background-color: #6a8df2;
            }
            &:last-child {
                background-color: #173e95;
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
