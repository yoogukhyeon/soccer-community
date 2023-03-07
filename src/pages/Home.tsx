import React from 'react';
import SwiperList from '../components/common/SwiperList';
import styled from 'styled-components';
import { MainTitle } from '@/common/style/common';
import Link from '@/components/main/Link';
import { useNavigate } from 'react-router-dom';
import CourseBox from '@/components/main/CourseList';
import { useCourseQuery } from '@/api/course';
import { banner } from '@/assets/banner';
import Community from '@/components/main/Community';
interface IItems {
    readonly img: string;
    readonly name: string;
}

export default function Home() {
    const swiperUseStatus = process.env.REACT_APP_SWIPER_USE;
    const items: IItems[] = banner;
    //useQuery list
    const { data, status } = useCourseQuery();

    return (
        <MainWrap>
            {swiperUseStatus && <SwiperList lists={items} />}
            <Link />
            <CommunityWrap>
                <MainTitle>커뮤니티</MainTitle>
                <div className="community_box">
                    <Community status={status} lists={data?.recentBoardList} title="최근글" />
                    <Community status={status} lists={data?.recentCommentList} title="최근·댓글" type="comment" />
                </div>
            </CommunityWrap>
            <CommunityWrap>
                <MainTitle>축구 소식</MainTitle>
                <div className="community_box">
                    <Community status={status} lists={data?.recentNewsWorldList} title="해외·축구" />
                    <Community status={status} lists={data?.recentNewsKoreaList} title="국내·축구" />
                </div>
            </CommunityWrap>
            <CourseWrap>
                <MainTitle>최신 인기축구 영상</MainTitle>
                <CourseBox lists={data?.courseList} status={status} />
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

const CommunityWrap = styled.div`
    margin-top: 30px;

    .community_box {
        display: flex;
        justify-content: space-around;
        align-items: center;
        gap: 25px;
    }

    @media screen and (max-width: 768px) {
        .community_box {
            flex-direction: column;
        }
    }
`;
