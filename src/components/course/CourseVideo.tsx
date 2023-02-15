import React, { useEffect, useState } from 'react';
import { CgChevronLeft, CgChevronRight } from 'react-icons/cg';
import { MdOpenInNew } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';
interface Video {
    channelTitle: string;
    videoId: string;
    title: string;
    tags: string;
    prev?: string;
    next?: string;
}

interface IProps {
    video: Video;
}

export default function CourseVideo({ video }: IProps) {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [iframe, setIframe] = useState(<></>);
    const goToBack = () => navigate('/');

    useEffect(() => {
        const url = (
            <iframe
                key={video.videoId}
                width="560"
                height="315"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                src={`https://www.youtube.com/embed/${video.videoId}`}
                allowFullScreen
            />
        );
        setIframe(url);
    }, [video]);

    return (
        <CourseVideoWrap>
            <div className="course_video_navi">
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
            </div>
            <div className="course_video_content">
                <div className="content_video_box">
                    <div className="iframe-container">{iframe}</div>
                </div>
            </div>
            <div className="content_nav">
                <div
                    className="prev"
                    onClick={() =>
                        navigate(`/course?channel=${video.channelTitle}&video=${video.prev}`, { replace: true })
                    }
                >
                    <i>
                        <CgChevronLeft />
                    </i>
                    <span>이전 영상</span>
                </div>
                <div
                    className="next"
                    onClick={() =>
                        navigate(`/course?channel=${video.channelTitle}&video=${video.next}`, { replace: true })
                    }
                >
                    <span>다음 영상</span>
                    <i>
                        <CgChevronRight />
                    </i>
                </div>
            </div>
            <div className="content_video_info">
                <div className="content_video_box">
                    <span className="content_video_tag">{video.tags}</span>
                    <h2 className="content_video_title">{video.title}</h2>
                </div>
            </div>
        </CourseVideoWrap>
    );
}

const CourseVideoWrap = styled.div`
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
    .content_nav {
        display: flex;
        justify-content: space-between;
        justify-items: center;
        padding: 20px 15px;
        border-bottom: 1px solid #e3e1e1;

        > div {
            display: flex;
            justify-content: space-between;
            align-items: center;
            cursor: pointer;

            span {
                font-size: 18px;
                font-weight: 600;
            }
            i {
                transform: translateY(2px);
                font-size: 18px;
            }
        }

        @media screen and (max-width: 768px) {
            > div {
                span {
                    font-size: 16px;
                }
                i {
                    transform: translateY(2px);
                    font-size: 16px;
                }
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

    .content_video_info {
        border-bottom: 1px solid #e3e1e1;
        .content_video_tag {
            display: block;
            padding: 15px 15px;
            color: #666666;
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
            padding: 3px 15px;
            margin-bottom: 25px;
        }
    }

    @media screen and (max-width: 768px) {
        & {
            width: 100%;
            height: auto;
        }
    }
`;
