import React from 'react';
import SwiperList from '../components/common/SwiperList';
import styled from 'styled-components';
import { CgChevronRight } from 'react-icons/cg';
import { MainTitle } from '@/common/style/common';
import Link from '@/components/main/Link';
import { useNavigate } from 'react-router-dom';
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

    const goToCourse = () => navigate('/course');
    return (
        <MainWrap>
            {swiperUseStatus && <SwiperList lists={items} />}
            <Link />
            <CourseWrap>
                <MainTitle>교육영상</MainTitle>
                <ul className="course_box" onClick={goToCourse}>
                    <li>
                        <div className="course_img">
                            <span>
                                <img
                                    src="https://signal.cidermics.com/_next/image?url=https%3A%2F%2Fimg.cidermics.com%2Ffiles%2FsignalContents%2F20230119%2F85f884c0-9783-11ed-9969-b597251127fd.jpg&w=1920&q=75"
                                    alt=""
                                />
                            </span>
                        </div>
                        <div className="course_info">
                            <div>
                                <span className="course_info_type">장전뉴스</span>
                                <p className="course_info_title">제목 2022년 01월 19일 (목)</p>
                            </div>
                            <span className="course_info_date">2022.01.19</span>
                        </div>
                    </li>
                    <li>
                        <div className="course_img">
                            <span>
                                <img
                                    src="https://signal.cidermics.com/_next/image?url=https%3A%2F%2Fimg.cidermics.com%2Ffiles%2FsignalContents%2F20230119%2F85f884c0-9783-11ed-9969-b597251127fd.jpg&w=1920&q=75"
                                    alt=""
                                />
                            </span>
                        </div>
                        <div className="course_info">
                            <div>
                                <span className="course_info_type">장전뉴스</span>
                                <p className="course_info_title">제목 2022년 01월 19일 (목)</p>
                            </div>
                            <span className="course_info_date">2022.01.19</span>
                        </div>
                    </li>
                    <li>
                        <div className="course_img">
                            <span>
                                <img
                                    src="https://signal.cidermics.com/_next/image?url=https%3A%2F%2Fimg.cidermics.com%2Ffiles%2FsignalContents%2F20230119%2F85f884c0-9783-11ed-9969-b597251127fd.jpg&w=1920&q=75"
                                    alt=""
                                />
                            </span>
                        </div>
                        <div className="course_info">
                            <div>
                                <span className="course_info_type">장전뉴스</span>
                                <p className="course_info_title">제목 2022년 01월 19일 (목)</p>
                            </div>
                            <span className="course_info_date">2022.01.19</span>
                        </div>
                    </li>
                    <li>
                        <div className="course_img">
                            <span>
                                <img
                                    src="https://signal.cidermics.com/_next/image?url=https%3A%2F%2Fimg.cidermics.com%2Ffiles%2FsignalContents%2F20230119%2F85f884c0-9783-11ed-9969-b597251127fd.jpg&w=1920&q=75"
                                    alt=""
                                />
                            </span>
                        </div>
                        <div className="course_info">
                            <div>
                                <span className="course_info_type">장전뉴스</span>
                                <p className="course_info_title">제목 2022년 01월 19일 (목)</p>
                            </div>
                            <span className="course_info_date">2022.01.19</span>
                        </div>
                    </li>
                </ul>
            </CourseWrap>
        </MainWrap>
    );
}

const MainWrap = styled.div`
    margin-bottom: 30px;
`;

const CourseWrap = styled.div`
    margin-top: 30px;

    .course_box {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-gap: 15px;
        > li::after {
            position: absolute;
            top: 0;
            left: 0;
            content: '';
            display: block;
            width: 100%;
            height: 100%;
            border: 1px solid #d0d0da;
            border-radius: 10px;
            box-sizing: border-box;
        }
        > li {
            position: relative;
            height: 300px;
            transition: all 0.3s ease 0s;
            border-radius: 10px;
            background: #f3f3f7;
            box-shadow: 4px 4px 15px rgb(0 0 0 / 15%);
            overflow: hidden;
            isolation: isolate;
            cursor: pointer;

            .course_img {
                position: relative;
                height: 135px;

                > span {
                    box-sizing: border-box;
                    display: block;
                    overflow: hidden;
                    width: initial;
                    height: initial;
                    background: none;
                    opacity: 1;
                    border: 0px;
                    margin: 0px;
                    padding: 0px;
                    position: absolute;
                    inset: 0px;

                    > img {
                        position: absolute;
                        inset: 0px;
                        box-sizing: border-box;
                        padding: 0px;
                        border: none;
                        margin: auto;
                        display: block;
                        width: 0px;
                        height: 0px;
                        min-width: 100%;
                        max-width: 100%;
                        min-height: 100%;
                        max-height: 100%;
                    }
                }
            }

            .course_info {
                height: calc(100% - 130px);
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: flex-start;
                padding: 18px 10px;

                .course_info_type {
                    display: block;
                    font-size: 14px;
                    color: #6a6a82;
                    margin-bottom: 7px;
                }

                .course_info_title {
                    display: inline-block;
                    width: 100%;
                    max-height: 100px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    font-size: 16px;
                    line-height: 1.4;
                    white-space: normal;
                    font-weight: 600;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    word-break: keep-all;
                }

                .course_info_date {
                    font-size: 13px;
                    color: #6a6a82;
                }
            }
        }

        ${({ theme }) => theme.media.tablet`
            grid-template-columns: repeat(3, 1fr);
        `}
        ${({ theme }) => theme.media.mobile`
            grid-template-columns: repeat(2, 1fr);
        `};
    }
`;
