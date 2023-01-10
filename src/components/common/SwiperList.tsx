import React from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination, Autoplay, Navigation } from 'swiper';
import 'swiper/css'; //basic
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface IProps {
    readonly img: string;
    readonly name: string;
}

interface IItems {
    lists: IProps[];
}

export default function SwiperList({ lists }: IItems): JSX.Element {
    /** SwiperCore 사용 */
    SwiperCore.use([Pagination, Autoplay, Navigation]);

    const settings = {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        scrollbar: {
            draggable: true,
        },
        autoplay: {
            delay: 2000,
        },
        pagination: {
            clickable: true,
        },
    };

    return (
        <SwiperWrap>
            <Swiper {...settings}>
                {lists.map((list, idx) => (
                    <SwiperSlide key={idx}>
                        <div className="swiper_img">
                            <img src={list.img} alt={list.name} />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </SwiperWrap>
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
