import React from 'react';
import styled from 'styled-components';
import { CgChevronLeft } from 'react-icons/cg';
import { MdOpenInNew } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

export default function Course() {
    const navigate = useNavigate();

    const goToBack = () => navigate(-1);

    return (
        <CourseWrap>
            <div>
                <div className="course_video">
                    <section className="course_video_navi">
                        <div className="go_back" onClick={goToBack}>
                            <i>
                                <CgChevronLeft />
                            </i>
                            <span>뒤로가기</span>
                        </div>
                        <div className="window_open">
                            <i>
                                <MdOpenInNew />
                            </i>
                            <span>새창 열기</span>
                        </div>
                    </section>
                    <section className="course_video_content">
                        <div className="content_video_box">
                            <div>
                                <iframe
                                    width="560"
                                    height="315"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    src="https://www.youtube.com/embed/d3PYoBwow9I"
                                    allowFullScreen
                                />
                            </div>
                        </div>
                    </section>
                    <section className="content_video_info">
                        <div className="content_video_box">
                            <span className="content_video_tag"> #혼술 #라면 #소주</span>
                            <h2 className="content_video_title">
                                실컷 비싼 외식 하고 굳이 추운 공장에서 라면 끓여 소주 일병 마시는 40대 아재
                            </h2>
                        </div>
                    </section>
                </div>
                <div className="course_list">
                    <ul>
                        <li>list</li>
                        <li>list</li>
                        <li>list</li>
                        <li>list</li>
                        <li>list</li>
                        <li>list</li>
                        <li>list</li>
                        <li>list</li>
                        <li>list</li>
                        <li>list</li>
                        <li>list</li>
                        <li>list</li>
                        <li>list</li>
                        <li>list</li>
                        <li>list123</li>
                        <li>list123</li>
                        <li>list123</li>
                        <li>list123</li>
                        <li>list123</li>
                        <li>list123</li>
                        <li>list123</li>
                        <li>list123</li>
                        <li>list123</li>
                        <li>list123</li>
                        <li>list123</li>
                        <li>list123</li>
                        <li>list123</li>
                        <li>list123</li>
                        <li>list123</li>
                        <li>list123</li>
                        <li>list123</li>
                        <li>list123</li>
                        <li>list123</li>
                        <li>list123</li>
                        <li>list123</li>
                        <li>list123</li>
                        <li>list123</li>
                        <li>list123</li>
                        <li>list123</li>
                        <li>list123</li>
                        <li>list123</li>
                        <li>list123ssssss</li>
                    </ul>
                </div>
            </div>
        </CourseWrap>
    );
}

const CourseWrap = styled.div`
    position: fixed;
    width: 100vw;
    height: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #ffffff;
    padding: 0 8px;

    > div {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .course_video {
            width: 70%;
            height: calc(var(--VIEW_HEIGHT, 1vh) * 100);
            max-height: calc(var(--VIEW_HEIGHT, 1vh) * 100);
            background-color: #ffffff;

            .course_video_navi {
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 80px;
                min-height: 80px;
                padding: 0 15px;
                background-color: #000000;
                color: #ffffff;

                > div {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    cursor: pointer;

                    i {
                        margin-right: 3px;
                        transform: translateY(3px);
                        font-size: 18px;
                    }
                }
            }

            .course_video_content {
                width: 100%;
                max-height: 100%;

                .content_video_box {
                    width: 100%;
                    height: 70vh;
                    max-height: 70vh;
                    -webkit-overflow-scrolling: touch;
                    scroll-behavior: smooth;
                    transform: translateZ(0);
                    -webkit-transform: translateZ(0);

                    div {
                        position: relative;
                        width: 100%;
                        height: 100%;
                    }
                    iframe {
                        width: 100%;
                        height: 100%;
                    }

                    @media (max-width: 1024px) {
                        & {
                            width: 100%;
                            height: auto;
                            max-height: none;

                            div {
                                position: relative;
                                width: 100%;
                                height: auto;
                                padding-bottom: 56.25%;
                            }
                            iframe {
                                position: absolute;
                                top: 0;
                                left: 0;
                                width: 100%;
                                height: 100%;
                            }
                        }
                    }
                }
            }
        }

        .content_video_title {
            display: inline-block;
            width: 100%;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: 18px;
            line-height: 24px;
            white-space: normal;
            font-weight: 600;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            word-break: keep-all;
        }

        .course_list {
            width: 30%;
            background-color: #ffffff;
            overflow-y: scroll;
            height: calc(var(--vh, 1vh) * 100);
            transition: right ease 0.2s 0s;
            box-shadow: -5px 0 10px rgb(0 0 0 / 20%);

            ul > li {
                width: 100%;
                background-color: #ffffff;
            }
        }

        @media screen and (max-width: 768px) {
            & {
                flex-direction: column;
                align-self: auto;
            }

            .course_video {
                width: 100%;
                height: auto;
            }
            .course_list {
                width: 100%;
                height: 500px;
                box-shadow: none;
            }
        }
    }
`;
