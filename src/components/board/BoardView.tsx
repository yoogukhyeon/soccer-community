import React, { useEffect, useState } from 'react';
import { HiHeart, HiOutlineHeart, HiOutlineLink } from 'react-icons/hi';
import { FaThumbsUp, FaRegThumbsUp } from 'react-icons/fa';
import styled from 'styled-components';
import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';
import { useNavigate, useLocation } from 'react-router-dom';
import { Auth, IView } from '@/types/board';
import { useDeleteMutation } from '@/api/board';
import { useQueryClient } from '@tanstack/react-query';
import { useConfirm } from '@/hooks/useConfirm';
import { storage } from '@/assets/storage';
import { useBoardLikeMutation } from '@/api/board/options/like';
import { useNewsRecommentMutation } from '@/api/news/options';

interface IProps {
    view: IView;
    auth: Auth;
    type?: string;
}

export default function BoardView({ view, auth, type }: IProps) {
    const queryClient = useQueryClient();
    const { mutate: boardMutate } = useDeleteMutation(type);
    const { mutate: boardLike } = useBoardLikeMutation(type);
    const { mutate: newsRecommend } = useNewsRecommentMutation();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const goToUpdate = (id: number) => {
        if (type === 'news') {
            navigate(`/football-news/detail/${id}/update`, { state: pathname });
        } else {
            navigate(`/boards/detail/${id}/update`, { state: pathname });
        }
    };

    const [isLike, setIsLike] = useState<boolean>(false);
    const [isRecommend, setIsRecommend] = useState<boolean>(false);
    const toggleLike = () => {
        const no = view.no;
        const typeKey = type === 'news' ? 'newsLikes' : 'boardLikes';
        const hitLikes = storage(typeKey, no);
        if (hitLikes) {
            boardLike(
                { no },
                {
                    onSuccess: (res) => {
                        if (res?.data?.message === 'success') {
                            const queryKey = type === 'news' ? 'newsDetail' : 'boardDetail';
                            queryClient.invalidateQueries([queryKey, no]);
                            setIsLike(true);
                        }
                    },
                    onError: (err) => {
                        console.log('err', err);
                        console.error(err);
                    },
                },
            );
        } else {
            let chkLikes: any = localStorage.getItem(typeKey);
            chkLikes = JSON.parse(chkLikes);
            const newLikes = chkLikes.filter((val: number) => val !== no);
            localStorage.setItem(typeKey, JSON.stringify(newLikes));
            setIsLike(false);
        }
    };

    const toggleRecommend = () => {
        const no = view.no;
        const typeKey = 'newsRecommends';
        const hitRecommend = storage(typeKey, no);

        if (hitRecommend) {
            newsRecommend(
                { no },
                {
                    onSuccess: (res) => {
                        if (res?.data?.message === 'success') {
                            queryClient.invalidateQueries(['newsDetail', no]);
                            setIsRecommend(true);
                        }
                    },
                    onError: (err) => {
                        console.log('err', err);
                        console.error(err);
                    },
                },
            );
        } else {
            let chkRecommends: any = localStorage.getItem(typeKey);
            chkRecommends = JSON.parse(chkRecommends);
            const newRecommends = chkRecommends.filter((val: number) => val !== no);
            localStorage.setItem(typeKey, JSON.stringify(newRecommends));
            setIsRecommend(false);
        }
    };
    useEffect(() => {
        const typeKey = type === 'news' ? 'newsLikes' : 'boardLikes';
        let chkLikes: any = localStorage.getItem(typeKey);
        chkLikes = JSON.parse(chkLikes);
        if (chkLikes?.includes(view.no)) {
            setIsLike(true);
        } else {
            setIsLike(false);
        }

        let chkRecommend: any = localStorage.getItem('newsRecommends');
        chkRecommend = JSON.parse(chkRecommend);
        if (chkRecommend?.includes(view.no)) {
            setIsRecommend(true);
        } else {
            setIsRecommend(false);
        }
    }, []);

    const boardDelete = (id: number) => {
        const data = type === 'news' ? { no: id, id: auth?.user?.id } : { no: id };
        useConfirm('글을 삭제 하시겠습니까?', () =>
            boardMutate(data, {
                onSuccess: (res) => {
                    if (res.data.message === 'success') {
                        const queryKey = type === 'news' ? 'newsList' : 'boardList';
                        queryClient.invalidateQueries([queryKey]);
                        const url = type === 'news' ? '/football-news' : '/boards';
                        navigate(url);
                    }
                },
                onError: (err) => {
                    console.log('err', err);
                    console.error(err);
                },
            }),
        );
    };

    const urlCopy = (): void => {
        const textarea = document.createElement('textarea');
        document.body.appendChild(textarea);
        let url = window.document.location.href;
        textarea.value = url;
        textarea.select();
        const result = document.execCommand('copy');

        if (result) {
            alert('URL 링크를 복사했습니다.');
            document.body.removeChild(textarea);
        }
    };

    return (
        <ViewWrap>
            <div className="view_header">
                <div className="title_box">
                    <div className="title_wrap">
                        <span className="category">{type === 'news' ? view.categoryName : view.category}</span>
                        <h2 className="title">{view.title}</h2>
                    </div>
                </div>
                <div className="view_info">
                    <b>{view.name} &nbsp;&middot; &nbsp; 2022-12-28 15:57</b>
                    <span className="count_box">
                        {type !== 'news' && (
                            <>
                                댓글 <b>{view.commentCnt} &middot; </b>
                            </>
                        )}
                        좋아요 <b>{view.like} &middot; </b>
                        조회수{' '}
                        <b>
                            {view.view} {type === 'news' && <>&middot;</>}
                        </b>
                        {type === 'news' && (
                            <>
                                추천수 <b>{view.recommend} </b>
                            </>
                        )}
                    </span>
                </div>
                <div className="content_wrap">
                    <FroalaEditorView model={view.content} />
                </div>

                {!!auth?.accessToken && view.userId && (
                    <ManageWrap>
                        <a onClick={() => goToUpdate(view.no)}>수정</a>
                        <a onClick={() => boardDelete(view.no)}>삭제</a>
                    </ManageWrap>
                )}

                <div className="content_info">
                    <div>
                        <div className="content_like">
                            <i onClick={toggleLike}>{isLike ? <HiHeart size={25} /> : <HiOutlineHeart size={25} />}</i>
                            <em>{view.like}</em>
                        </div>
                        {type === 'news' && (
                            <div className="content_like">
                                <i onClick={toggleRecommend}>
                                    {isRecommend ? <FaThumbsUp size={20} /> : <FaRegThumbsUp size={20} />}
                                </i>
                                <em>{view.recommend}</em>
                            </div>
                        )}
                        <div className="content_like">
                            <i onClick={urlCopy}>
                                <HiOutlineLink size={25} />
                            </i>
                        </div>
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
        margin-top: 3px;
        > div {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 20px;
        }
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
    padding-bottom: 15px;
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
