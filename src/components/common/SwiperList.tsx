import React from 'react';
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
        <Swiper {...settings}>
            {lists.map((list, idx) => (
                <SwiperSlide key={idx}>
                    <div>
                        <img src={list.img} alt={list.name} />
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
