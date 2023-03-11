import React from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination, Autoplay, Navigation } from 'swiper';
import 'swiper/css'; //basic
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { LazyLoadImage } from 'react-lazy-load-image-component';
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
                        <a href="https://fnfsoccer.com" target="_blank">
                            <div className="swiper_img">
                                <LazyLoadImage src={list.img} alt={list.name} />
                            </div>
                        </a>
                    </SwiperSlide>
                ))}
            </Swiper>
        </SwiperWrap>
    );
}

const SwiperWrap = styled.div`
    height: 230px;
    background-color: #eee;
    border-radius: 7px;
    margin: 15px 0;
    overflow: hidden;
    object-fit: cover;

    a {
        display: block;
        width: 100%;
        height: 230px;
        cursor: pointer;
        position: relative;
        z-index: 9999;
    }
    .swiper_img {
        width: 100%;
        height: 230px;

        img {
            width: inherit;
            height: inherit;
            object-fit: fill;
            object-position: center;
        }
    }

    .swiper-pagination-bullet-active {
        background-color: #fff;
    }
`;
