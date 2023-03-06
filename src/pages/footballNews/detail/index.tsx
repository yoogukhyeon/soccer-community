import { useBoardDetailQuery } from '@/api/board';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { CgChevronLeft } from 'react-icons/cg';
import Loading from '@/components/common/Loading';
import BoardView from '@/components/board/BoardView';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useAtom } from 'jotai';
import authAtom from '@/stores/authAtom';
import CommentBox from '@/components/comment/CommentBox';
import { useCommentQuery, useReplyQuery } from '@/api/comment';
import { useNewsDetailQuery } from '@/api/news';

export default function index() {
    const { state } = useLocation();
    const [auth] = useAtom(authAtom);
    const { id } = useParams();
    const { data, status, refetch } = useNewsDetailQuery(Number(id));
    /*     const { data: comment, refetch: commentRefetch } = useCommentQuery(Number(id));
    const { data: reply, refetch: replyRefetch } = useReplyQuery(Number(id)); */
    const navigate = useNavigate();
    const goToBack = () => navigate(state);

    useEffect(() => {
        refetch();
    }, [data]);

    return (
        <>
            <GoToBtn onClick={goToBack}>
                <i>
                    <CgChevronLeft />
                </i>
                <span>목록으로 가기</span>
            </GoToBtn>
            {status === 'loading' && <Loading />}
            {status === 'error' && <div>Server Error...</div>}
            {data && <BoardView view={data} auth={auth} type="news" />}
        </>
    );
}

const GoToBtn = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    cursor: pointer;
    color: #6a6a82;
    margin: 30px 0 20px;

    i {
        font-size: 18px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    span {
        font-size: 16px;
    }
`;

const CommentWrap = styled.div`
    .comment_count {
        padding: 10px 0;
        color: #666666;
        font-size: 16px;
        font-weight: 500;
    }

    @media screen and (max-width: 768px) {
        .comment_count {
            padding: 5px 0;
            font-size: 14px;
        }
    }
`;
