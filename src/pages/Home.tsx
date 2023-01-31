import React from 'react';
import SwiperList from '../components/common/SwiperList';
import styled from 'styled-components';
import { CgChevronRight } from 'react-icons/cg';
import { MainTitle } from '@/common/style/common';
import Link from '@/components/main/Link';
import { useNavigate } from 'react-router-dom';
import CourseBox from '@/components/main/CourseList';
import { useCourseQuery } from '@/api/course';
interface IItems {
    readonly img: string;
    readonly name: string;
}

export default function Home() {
    const navigate = useNavigate();
    const swiperUseStatus = process.env.REACT_APP_SWIPER_USE;
    const items: IItems[] = [
        {
            img: 'https://marketplace.canva.com/EAD45U_YmP8/1/0/1600w/canva-%EA%B2%80%EC%9D%80%EC%83%89-%EB%B0%8F-%ED%9D%B0%EC%83%89-%ED%85%80%EB%B8%94%EB%9F%AC-%EB%B0%B0%EB%84%88-2ErcDPuy7xI.jpg',
            name: '사진1',
        },
        {
            img: 'http://www.readersnews.com/news/photo/201710/75714_35131_5219.jpg',
            name: '사진2',
        },
        {
            img: 'https://t4.ftcdn.net/jpg/04/63/97/77/360_F_463977716_3JHbPJY5FsvCbDkbhT86cZlGZw0mzKRq.jpg',
            name: '사진3',
        },
    ];
    //useQuery list
    const { data, status } = useCourseQuery();

    return (
        <MainWrap>
            {swiperUseStatus && <SwiperList lists={items} />}
            <Link />
            <CourseWrap>
                <MainTitle>교육영상</MainTitle>
                <CourseBox lists={data} status={status} />
            </CourseWrap>
        </MainWrap>
    );
}

const MainWrap = styled.div`
    margin-bottom: 30px;
`;

const CourseWrap = styled.div`
    margin-top: 30px;
`;
