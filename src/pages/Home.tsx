import React from 'react';
import styled from 'styled-components';
import SwiperList from '../components/common/SwiperList';

interface IItems {
    readonly img: string;
    readonly name: string;
}

export default function Home() {
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

    return (
        <>
            <SwiperWrap>
                <SwiperList lists={items} />
            </SwiperWrap>
        </>
    );
}

const SwiperWrap = styled.div`
    height: 210px;
    background-color: #eee;
    border-radius: 7px;
    margin: 15px 0;
    overflow: hidden;
    object-fit: cover;

    .swiper_img {
        width: 100%;
        height: 210px;

        img {
            width: inherit;
            height: inherit;
            object-fit: cover;
            object-position: center;
        }
    }

    .swiper-pagination-bullet-active {
        background-color: #fff;
    }
`;
