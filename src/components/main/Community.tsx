import React from 'react';
import styled from 'styled-components';

interface IProps {
    readonly title: string;
}

export default function Community({ title }: IProps) {
    return (
        <CommunityWrap>
            <h2>{title}</h2>
            <ul>
                <li>
                    <div className="community_info_wrap">
                        <p>
                            안녕하세요 최신글
                            입니다!!!!!!!!!후후wefefweifjmeowifjoweifjsdvbsbvkjsdbvsdjewoicoweicnowencweiocnowencinklsdnlsnvsjdbwebewybewuyqodjoqiwdj
                        </p>
                        <div className="community_info_option">
                            <span>조회수: 10</span>
                            <span>좋아요: 20</span>
                        </div>
                    </div>
                </li>
                <li></li>
                <li>
                    <div className="community_info_wrap">
                        <p>
                            안녕하세요 최신글
                            입니다!!!!!!!!!후후wefefweifjmeowifjoweifjsdvbsbvkjsdbvsdjewoicoweicnowencweiocnowencinklsdnlsnvsjdbwebewybewuyqodjoqiwdj
                        </p>
                        <div className="community_info_option">
                            <span>조회수: 10</span>
                            <span>좋아요: 20</span>
                        </div>
                    </div>
                </li>
                <li>
                    <div className="community_info_wrap">
                        <p>
                            안녕하세요 최신글
                            입니다!!!!!!!!!후후wefefweifjmeowifjoweifjsdvbsbvkjsdbvsdjewoicoweicnowencweiocnowencinklsdnlsnvsjdbwebewybewuyqodjoqiwdj
                        </p>
                        <div className="community_info_option">
                            <span>조회수: 10</span>
                            <span>좋아요: 20</span>
                        </div>
                    </div>
                </li>
            </ul>
        </CommunityWrap>
    );
}

const CommunityWrap = styled.div`
    width: 48%;

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
            gap: 10px;
            > span {
                color: #94969b;
                white-space: nowrap;
            }
        }
    }

    @media screen and (max-width: 768px) {
        & {
            width: 100%;
        }
    }
`;
