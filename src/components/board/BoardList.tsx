import React from 'react';
import styled from 'styled-components';
import Loading from '../common/Loading';
import { WordBreak } from '@/common/style/common';
import { useNavigate } from 'react-router-dom';
interface List {
    readonly category: string;
    readonly regDate: string;
    readonly no: number;
    readonly like: number;
    readonly title: string;
    readonly view: number;
}

interface IProps {
    lists: List[];
    status: string;
}

export default function BoardList({ lists, status }: IProps) {
    const navigate = useNavigate();

    const goToDetail = (id: number) => {
        navigate(`/boards/detail/${id}`);
    };

    return (
        <ul>
            {status === 'loading' && <Loading />}
            {status === 'error' && <div>Server Error...</div>}
            {lists &&
                lists?.map((list) => (
                    <List key={list.no} onClick={() => goToDetail(list.no)}>
                        <em>{list.category}</em>
                        <p>{list.title}</p>
                        <div className="option_box">
                            <div>
                                <span>pud</span>
                                <i className="option_dot" />
                                <span>{list.regDate}</span>
                            </div>
                            <div className="counter_box">
                                <span>댓글 0</span>
                                <i className="option_dot" />
                                <span>좋아요 {list.like}</span>
                                <i className="option_dot" />
                                <span>조회수 {list.view}</span>
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
