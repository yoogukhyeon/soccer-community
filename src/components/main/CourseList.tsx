import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Loading from '../common/Loading';
import { LazyLoadImage } from 'react-lazy-load-image-component';
interface Data {
    channelTitle: string;
    no: number;
    regDate: string;
    thumb: string;
    title: string;
    videoId: string;
}

interface IProps {
    lists: Data[];
    status: any;
}

export default function CourseBox({ lists, status }: IProps) {
    const navigate = useNavigate();
    const goToCourse = (channelTitle: string, videoId: string): void =>
        navigate(`/course?channel=${channelTitle}&video=${videoId}`);

    return (
        <>
            {status === 'loading' && <Loading size="sm" />}
            {status === 'error' && <div>Server Error...</div>}
            <CourseBoxWrap>
                {lists?.map((val: Data) => (
                    <li key={val.no} onClick={() => goToCourse(val.channelTitle, val.videoId)}>
                        <div className="course_img">
                            <span>
                                <LazyLoadImage src={val.thumb} alt="course thumb" />
                            </span>
                        </div>
                        <div className="course_info">
                            <div>
                                <span className="course_info_type">{val.channelTitle}</span>
                                <p className="course_info_title">{val.title}</p>
                            </div>
                            <span className="course_info_date">{val.regDate}</span>
                        </div>
                    </li>
                ))}
            </CourseBoxWrap>
        </>
    );
}

const CourseBoxWrap = styled.div`
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
`;
