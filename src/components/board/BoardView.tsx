import React, { useEffect, useState } from 'react';
import { HiHeart, HiOutlineHeart } from 'react-icons/hi';
import styled from 'styled-components';
import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';
import { useNavigate } from 'react-router-dom';
import { IView } from '@/types/board';

interface IProps {
    view: IView;
}

export default function BoardView({ view }: IProps) {
    const navigate = useNavigate();
    const goToUpdate = (id: number) => {
        navigate(`/boards/detail/${id}/update`);
    };

    const [isLike, setIsLike] = useState<boolean>(false);
    const toggleLike = () => {
        setIsLike((prev) => !prev);
    };

    return (
        <ViewWrap>
            <div className="view_header">
                <div className="title_box">
                    <div className="title_wrap">
                        <span className="category">{view.category}</span>
                        <h2 className="title">{view.title}</h2>
                    </div>
                </div>
                <div className="view_info">
                    <b>PUD &nbsp;&middot; &nbsp; 2022-12-28 15:57</b>
                    <span className="count_box">
                        댓글 <b>{view.commentCount} &middot; </b>
                        좋아요 <b>{view.likes} &middot; </b>
                        조회수 <b>{view.views}</b>
                    </span>
                </div>
                <div className="content_wrap">
                    <FroalaEditorView model={view.content} />
                </div>

                <ManageWrap>
                    <a onClick={() => goToUpdate(view.id)}>수정</a>
                    <a>삭제</a>
                </ManageWrap>

                <div className="content_info">
                    <div className="content_like">
                        <i onClick={toggleLike}>{isLike ? <HiHeart size={25} /> : <HiOutlineHeart size={25} />}</i>
                        <em>23</em>
                    </div>
                    <i>
                        <img src="/img/icon_report.svg" alt="ICON" width={25} height={25} />
                    </i>
                </div>
            </div>
        </ViewWrap>
    );
}

const ViewWrap = styled.div`
    .title_box {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .title_wrap {
            display: flex;
            justify-content: space-between;
            align-items: center;

            .category {
                display: block;
                margin-right: 15px;
                padding: 5px 12px;
                background-color: #e6e6ef;
                color: #29293f;
                border-radius: 15px;
                font-weight: 500;
                font-size: 14px;
                word-break: keep-all;
                text-align: center;
                line-height: 18px;
            }
            .title {
                color: #010110;
                font-weight: 600;
                font-size: 20px;
                line-height: 24px;
                word-break: keep-all;
            }
        }
    }

    .view_info {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        font-weight: 400;
        font-size: 15px;
        line-height: 19px;
        padding: 12px 0;
        color: #6a6a82;
        border-bottom: 1px solid #d3d3e4;
    }

    .content_wrap {
        margin: 10px 0;
        min-height: 180px;
        margin-bottom: 30px;
        font-size: 16px;

        * {
            line-height: 1.5;
        }
        em {
            font-style: italic;
        }
        ul li {
            list-style: circle;
        }
        ol {
            padding-inline-start: 2rem;
        }
        ol li {
            list-style: decimal;
        }
        a {
            text-decoration: underline;
            color: #00a7e1;
        }
        table {
            word-break: break-all;
        }

        img {
            display: block;
            max-width: 100%;
            height: auto;
        }
    }

    .content_info {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .content_like {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            color: #6a6a82;
            font-size: 16px;
            font-weight: 500;

            i {
                font-size: 18px;
                color: #ff4c0e;
                cursor: pointer;
                margin-right: 2px;
            }
        }

        i {
            cursor: pointer;
        }
    }
    @media screen and (max-width: 768px) {
        .title_box {
            .title_wrap {
                .category {
                    font-size: 12px;
                    line-height: 16px;
                }
                .title {
                    font-size: 18px;
                    line-height: 22px;
                }
            }
        }

        .view_info {
            font-size: 12px;
            line-height: 16px;
            padding: 9px 0;
        }
        .content_info {
            .content_like {
                font-size: 14px;
            }
        }
    }
`;

const ManageWrap = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 10px;
    color: #6a6a82;
    font-size: 16px;
    font-weight: bold;
    padding-bottom: 10px;
    a {
        cursor: pointer;
        white-space: nowrap;
    }

    a:nth-child(2) {
        color: red;
    }

    @media screen and (max-width: 768px) {
        & {
            font-size: 12px;
            gap: 7px;
        }
    }
`;
