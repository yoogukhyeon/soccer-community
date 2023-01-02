import React from 'react';
import styled from 'styled-components';

interface List {
    readonly category: string;
    readonly commentCount: number;
    readonly diffDate: string;
    readonly id: number;
    readonly likes: number;
    readonly title: string;
    readonly views: number;
}

interface IProps {
    lists: List[];
}

export default function BoardList({ lists }: IProps) {
    return (
        <ul>
            {lists?.map((list) => (
                <List key={list.id}>
                    <em>{list.category}</em>
                    <p>{list.title}</p>
                    <div className="option_box">
                        <div>
                            <span>pud</span>
                            <i className="option_dot" />
                            <span>{list.diffDate}</span>
                        </div>
                        <div className="counter_box">
                            <span>댓글 {list.commentCount}</span>
                            <i className="option_dot" />
                            <span>좋아요 {list.likes}</span>
                            <i className="option_dot" />
                            <span>조회수 {list.views}</span>
                            <i className="option_dot" />
                            <span>등록날짜 {list.diffDate}</span>
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
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
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
                margin-left: 12px;
            }
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
