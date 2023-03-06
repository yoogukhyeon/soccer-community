import React from 'react';
import styled from 'styled-components';
import Loading from '../common/Loading';
import { WordBreak } from '@/common/style/common';
import { useNavigate, useLocation } from 'react-router-dom';
import { storage } from '@/assets/storage';
import { useBoardViewMutation } from '@/api/board/options/view';
import { useQueryClient } from '@tanstack/react-query';
interface List {
    readonly category: string;
    readonly regDate: string;
    readonly no: number;
    readonly like: number;
    readonly title: string;
    readonly view: number;
    readonly commentCnt: number;
    readonly recommend?: number;
    readonly categoryName?: string;
}

interface IProps {
    lists: List[];
    status: string;
    type?: string;
}

export default function BoardList({ lists, status, type }: IProps) {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const queryClient = useQueryClient();
    const { mutate: viewMutate } = useBoardViewMutation(type);

    const goToDetail = (id: number) => {
        //localStorage 저장
        const hitViews = storage(type === 'news' ? 'news' : 'views', id);

        if (hitViews) {
            viewMutate(
                { no: id },
                {
                    onSuccess: (res) => {
                        if (res?.data?.message === 'success') {
                            const queryKey = type === 'news' ? 'newsDetail' : 'boardDetail';
                            queryClient.invalidateQueries([queryKey, id]);
                        }
                    },
                    onError: (err) => {
                        console.log('err', err);
                        console.error(err);
                    },
                },
            );
        }
        const url = type === 'news' ? `/football-news/detail/${id}` : `/boards/detail/${id}`;
        navigate(url, { state: pathname });
    };

    return (
        <ul>
            {status === 'loading' && <Loading />}
            {status === 'error' && <div>Server Error...</div>}
            {lists && lists.length < 1 && (
                <List>
                    <div className="title">데이터가 없습니다.</div>
                </List>
            )}
            {lists &&
                lists?.map((list) => (
                    <List key={list.no} onClick={() => goToDetail(list.no)}>
                        <em> {type === 'news' ? list.categoryName : list.category}</em>
                        <p>{list.title}</p>
                        <div className="option_box">
                            <div>
                                <span>pud</span>
                                <i className="option_dot" />
                                <span>{list.regDate}</span>
                            </div>
                            <div className="counter_box">
                                <span>댓글 {list.commentCnt}</span>
                                <i className="option_dot" />
                                <span>좋아요 {list.like}</span>
                                <i className="option_dot" />
                                <span>조회수 {list.view}</span>
                                {type === 'news' && (
                                    <>
                                        <i className="option_dot" />
                                        <span>추천수 {list.recommend}</span>
                                    </>
                                )}

                                <i className="option_dot" />
                                <span>등록날짜 {list.regDate}</span>
                            </div>
                        </div>
                    </List>
                ))}
        </ul>
    );
}

const List = styled.li`
    & {
        width: 100%;
        padding: 20px 0;
        border-bottom: 1px solid #d3d3e4;
        cursor: pointer;

        .title {
            text-align: center;
            font-size: 18px;
            font-weight: 600;
        }

        em {
            color: #6a6a82;
            font-size: 14px;
        }

        p {
            font-size: 20px;
            ${WordBreak};
            line-height: 28px;
            margin: 4px 0;
            font-weight: 600;
        }

        .option_box {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            color: #6a6a82;
            font-size: 12px;
            margin-top: 10px;

            i.option_dot {
                display: inline-block;
                margin: 0 2px;
                font-size: 12px;
                ::before {
                    content: '·';
                }
            }

            .counter_box {
                ${WordBreak};
                margin-left: 12px;
            }
        }
        .option_box > div {
            ${WordBreak};
        }
    }

    @media screen and (max-width: 768px) {
        & {
            .title {
                font-size: 16px;
            }
            em {
                font-size: 12px;
            }
            p {
                font-size: 18px;
                line-height: 24px;
            }

            .option_box {
                font-size: 10px;
            }
        }
    }
`;
