import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { CgChevronLeft } from 'react-icons/cg';
import { MdOpenInNew } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { CgChevronDown } from 'react-icons/cg';
import { HiCheck } from 'react-icons/hi';
import { useSearchParams } from 'react-router-dom';
interface IVideoList<T> {
    [key: number]: T;
}

export default function Course() {
    const [searchParams] = useSearchParams();
    const [query, setQuery] = useState<any>(searchParams);
    const [openList, setOpenList] = useState<IVideoList<boolean>>({});
    const navigate = useNavigate();

    const goToBack = () => navigate(-1);

    const handleList = (no: number) => {
        setOpenList({
            ...openList,
            [no]: !openList[no],
        });
    };

    useEffect(() => {
        setQuery(Number(searchParams.get('video')));
        setOpenList({
            [1]: true,
        });
    }, [searchParams]);

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
                    <div className="list_header">
                        <div>Mysql 정규화</div>
                    </div>
                    <div className="list_info">
                        <div>
                            <i></i>
                            <p>재생목록</p>
                        </div>
                    </div>
                    <div className="list_content_wrap">
                        <article
                            className={`list_content_title ${openList[1] ? 'active' : ''} `}
                            onClick={() => handleList(1)}
                        >
                            <p>Mysql 정규화</p>
                            <i>
                                <CgChevronDown />
                            </i>
                        </article>
                        <ul className="list_content">
                            <li
                                className={`${query === 1 ? 'active' : ''}`}
                                onClick={() => navigate(`/course?video=${1}`)}
                            >
                                <div className="content_status">
                                    <i>
                                        <HiCheck />
                                    </i>
                                </div>
                                <div className="content_info">
                                    <div className="content_title">
                                        <p>coding</p>
                                        <span>생활코딩</span>
                                    </div>
                                </div>
                            </li>
                            <li
                                className={`${query === 2 ? 'active' : ''}`}
                                onClick={() => navigate(`/course?video=${2}`)}
                            >
                                <div className="content_status">
                                    <i>
                                        <HiCheck />
                                    </i>
                                </div>
                                <div className="content_info">
                                    <div className="content_title">
                                        <p>coding</p>
                                        <span>생활코딩</span>
                                    </div>
                                </div>
                            </li>
                            <li
                                className={`${query === 3 ? 'active' : ''}`}
                                onClick={() => navigate(`/course?video=${3}`)}
                            >
                                <div className="content_status">
                                    <i>
                                        <HiCheck />
                                    </i>
                                </div>
                                <div className="content_info">
                                    <div className="content_title">
                                        <p>coding</p>
                                        <span>생활코딩</span>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
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
            width: 75%;
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
            width: 25%;
            background-color: #ffffff;
            overflow-y: scroll;
            height: calc(var(--vh, 1vh) * 100);
            transition: right ease 0.2s 0s;
            box-shadow: -5px 0 10px rgb(0 0 0 / 20%);

            .list_header {
                padding: 20px 13px;
                border-bottom: 1px solid #e3e1e1;
                font-size: 20px;
                line-height: 24px;
            }
            .list_info {
                padding: 20px 13px;
                border-bottom: 1px solid #e3e1e1;
                font-size: 16px;
                line-height: 20px;
                color: #666666;
                > div {
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    i {
                        background: url('/img/icon_class_playlist.svg') no-repeat bottom center;
                        width: 17px;
                        height: 20px;
                        background-size: 100%;
                        margin-right: 10px;
                    }
                }
            }

            .list_content_wrap {
                .list_content_title {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 20px 13px;
                    background: #e3e1e1;
                    font-size: 18px;
                    line-height: 22px;
                    cursor: pointer;

                    i {
                        font-size: 24px;
                    }
                    &.active i {
                        transform: rotate(180deg);
                    }
                    &.active + .list_content {
                        height: auto;
                    }
                }

                .list_content {
                    height: 0;
                    overflow: hidden;
                    > li {
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;
                        width: 100%;
                        padding: 20px 13px;
                        background-color: #ffffff;
                        border-bottom: 1px solid #e3e1e1;
                        cursor: pointer;

                        &.active {
                            background: #323232;

                            .content_status {
                                color: #ffffff;
                            }
                            .content_info {
                                color: #ffffff;
                            }
                        }
                    }

                    .content_status {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        width: 40px;
                        color: #d6d6d6;
                        transform: translateY(4px);
                        margin-right: 8px;

                        i {
                            font-size: 24px;
                        }
                    }

                    .content_info {
                        width: 100%;
                        .content_title {
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            font-size: 16px;
                            font-weight: 600;

                            p {
                                word-break: keep-all;
                            }
                        }
                    }
                }
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
