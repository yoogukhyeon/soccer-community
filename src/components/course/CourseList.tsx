import React, { useEffect, useState } from 'react';
import { CgChevronDown } from 'react-icons/cg';
import { HiCheck } from 'react-icons/hi';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
interface IVideoList<T> {
    [key: number]: T;
}

export default function CourseList() {
    const [searchParams] = useSearchParams();
    const [query, setQuery] = useState<any>(searchParams);
    const [openList, setOpenList] = useState<IVideoList<boolean>>({});
    const navigate = useNavigate();

    const handleList = (no: number) => {
        setOpenList({
            ...openList,
            [no]: !openList[no],
        });
    };

    useEffect(() => {
        setQuery(Number(searchParams.get('video')));
        const query = Number(searchParams.get('video'));

        if (query === 0) {
            setOpenList({
                [1]: false,
            });
        } else {
            setOpenList({
                [1]: true,
            });
        }
    }, [searchParams]);
    return (
        <CourseListWarp>
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
                <article className={`list_content_title ${openList[1] ? 'active' : ''} `} onClick={() => handleList(1)}>
                    <p>Mysql 정규화</p>
                    <i>
                        <CgChevronDown />
                    </i>
                </article>
                <ul className="list_content">
                    <li className={`${query === 1 ? 'active' : ''}`} onClick={() => navigate(`/course?video=${1}`)}>
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
                    <li className={`${query === 2 ? 'active' : ''}`} onClick={() => navigate(`/course?video=${2}`)}>
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
                    <li className={`${query === 3 ? 'active' : ''}`} onClick={() => navigate(`/course?video=${3}`)}>
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
        </CourseListWarp>
    );
}

const CourseListWarp = styled.div`
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
`;
