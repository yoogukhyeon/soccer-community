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
    //useQuery list
    const { data, status } = useCourseQuery();

    return (
        <MainWrap>
            {swiperUseStatus && <SwiperList lists={items} />}
            <Link />
            <CourseWrap>
                <MainTitle>교육영상</MainTitle>
                <MainTitle>교육영상</MainTitle>
                <MainTitle>교육영상</MainTitle>
                <MainTitle>교육영상</MainTitle>
                <MainTitle>교육영상</MainTitle>
                <MainTitle>교육영상</MainTitle>
                <MainTitle>교육영상</MainTitle>
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
