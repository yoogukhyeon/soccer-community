import React from 'react';
import styled from 'styled-components';
import Loading from '../common/Loading';

interface Lists {
    no: number;
    title?: string;
    content?: string;
    view?: number;
    like: number;
    regDate: string;
    recommend?: number;
}
interface IProps {
    readonly title: string;
    readonly lists: Lists[];
    readonly type?: string;
    readonly status: any;
}

export default function Community({ title, lists, type, status }: IProps) {
    return (
        <>
            {status === 'loading' && <Loading size="sm" />}
            {status === 'error' && <div>Server Error...</div>}
            {/*         {lists?.length < 1 && */}
            {lists && (
                <CommunityWrap>
                    <h2>{title}</h2>
                    <ul>
                        {lists?.length > 0 ? (
                            lists.map((val: Lists) => (
                                <li key={val.no}>
                                    <div className="community_info_wrap">
                                        <p>{type === 'comment' ? val.content : val.title}</p>
                                        <div className="community_info_option">
                                            {type !== 'comment' && <span>조회수: {val.view}</span>}
                                            <span>좋아요: {val.like}</span>
                                        </div>
                                    </div>
                                </li>
                            ))
                        ) : (
                            <CommunityMsg>최신 데이터가 없습니다.</CommunityMsg>
                        )}
                    </ul>
                </CommunityWrap>
            )}
        </>
    );
}

const CommunityMsg = styled.div`
    width: 100%;
    padding: 20px 0;
    border-bottom: 1px solid #d3d3e4;
    cursor: pointer;
    text-align: center;
    margin-bottom: 30px;
`;

const CommunityWrap = styled.div`
    width: 48%;
    height: 170px;

    > h2 {
        font-size: 18px;
        line-height: 24px;
        border-bottom: 2px solid #eee;
        padding: 10px 0;
        margin-bottom: 10px;
    }

    .community_info_wrap {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;
        padding: 10px 0;

        > p {
            line-height: 24px;
            word-break: break-all;
            display: inline-block;
            width: 350px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            flex-grow: 1;
        }

        .community_info_option {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 7px;
            > span {
                color: #94969b;
                white-space: nowrap;
                font-size: 13px;
            }
        }
    }

    @media screen and (max-width: 768px) {
        & {
            width: 100%;
            height: auto;
        }
    }
`;
