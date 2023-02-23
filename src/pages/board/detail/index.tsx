import { useBoardDetailQuery } from '@/api/board';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { CgChevronLeft } from 'react-icons/cg';
import Loading from '@/components/common/Loading';
import BoardView from '@/components/board/BoardView';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import CommentForm from '@/components/board/common/CommentForm';
import { useAtom } from 'jotai';
import authAtom from '@/stores/authAtom';
import { CommentList } from '@/common/style/common';

export default function index() {
    const [auth] = useAtom(authAtom);
    const { id } = useParams();
    const { data, status, refetch } = useBoardDetailQuery(Number(id));

    const navigate = useNavigate();
    const goToBack = () => navigate('/boards');

    //댓글
    const [comment, setComment] = useState<string>('');
    const [reply, setReply] = useState<string>('');
    useEffect(() => {
        refetch();
    }, [data]);

    //reply toggle
    const [replyToggle, setReplyToggle] = useState<boolean>(false);

    const [selectedCommentIndex, setSelectedCommentIndex] = useState<number>();
    const inputRef = useRef<HTMLInputElement>(null);
    const [cancelled, setCancelled] = useState<boolean>(false);

    const [double, setDouble] = useState<number | null>(null);

    //comment 수정
    const [isUpdateForm, setIsUpdateForm] = useState<boolean>(false);

    const toggleReply = (no: number) => {
        setIsUpdateForm(false);
        setReplyToggle(true);
        setDouble(no);
        if (double === no) {
            setCancelled(true);
            if (inputRef.current !== null) inputRef.current.focus();
            setDouble(null);
        } else {
            setCancelled(false);
        }

        setSelectedCommentIndex(no);
        setReply('');
    };

    const updateForm = (no: number, content: string) => {
        setDouble(no);
        if (double !== no) setCancelled(false);
        setReplyToggle(false);
        setIsUpdateForm(true);
        setSelectedCommentIndex(no);
        setComment(content);
    };

    const test: any[] = [
        {
            no: 1,
            userId: 6,
            name: 'pud',
            regDate: '2023-02-14',
            content: '욜로 11111',
        },
        {
            no: 2,
            userId: 5,
            name: 'pud',
            regDate: '2023-02-14',
            content: '욜로 2222',
        },
        {
            no: 3,
            userId: 5,
            name: 'pud',
            regDate: '2023-02-14',
            content: '욜로 33333',
        },
        {
            no: 4,
            userId: 5,
            name: 'pud',
            regDate: '2023-02-14',
            content: '욜로 44444',
        },
        {
            no: 5,
            userId: 4,
            name: 'pud',
            regDate: '2023-02-14',
            content: '욜로 55555',
        },
    ];

    const test2: any[] = [
        {
            no: 1,
            parentNo: 1,
            userId: 6,
            name: '아구몬',
            regDate: '2023-02-14',
            content: '대댓글 입니다 아구몬!!!',
        },
        {
            no: 2,
            parentNo: 2,
            userId: 6,
            name: '아구몬',
            regDate: '2023-02-14',
            content: '대댓글 입니다 이상해씨!!!',
        },
        {
            no: 3,
            parentNo: 5,
            userId: 3,
            name: '아구몬',
            regDate: '2023-02-14',
            content: '대댓글 입니다 이상해씨!!!',
        },
    ];

    //comment 수정
    const [isReplyUpdateForm, setIsReplyUpdateForm] = useState<boolean>(false);
    const [selectedReplyIndex, setSelectedReplyIndex] = useState<number>();

    const replyUpdateForm = (no: number, content: string): void => {
        setIsReplyUpdateForm(true);
        setSelectedReplyIndex(no);
        setReply(content);
    };

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
            {data && <BoardView view={data} auth={auth} />}
            {data && (
                <CommentWrap>
                    <CommentForm isUpdate={false} isReply={false} setComment={setComment} comment={comment} />
                    <p className="comment_count">댓글 3</p>
                    <CommentListWrap>
                        <div className="comment_box">
                            {test.map((parent, idx) => (
                                <CommentListBox key={parent.no}>
                                    <dt>
                                        <b>
                                            {parent.name} <em>{parent.regDate}</em>
                                        </b>
                                        <p>{parent.content}</p>
                                    </dt>
                                    <dd>
                                        <em onClick={() => toggleReply(parent.no)}>답글달기</em>
                                        <em>신고</em>
                                        {!!auth?.accessToken && auth.user?.id === parent.userId && (
                                            <>
                                                <em onClick={() => updateForm(parent.no, parent.content)}>수정</em>
                                                <em>삭제</em>
                                            </>
                                        )}
                                    </dd>

                                    {replyToggle && selectedCommentIndex === parent.no && (
                                        <CommentForm
                                            isUpdate={false}
                                            isReply={true}
                                            setToggle={setReplyToggle}
                                            setReply={setReply}
                                            reply={reply}
                                            focus={inputRef}
                                            cancelled={cancelled}
                                            setCancelled={setCancelled}
                                        />
                                    )}

                                    {isUpdateForm && selectedCommentIndex === parent.no && (
                                        <CommentForm
                                            isUpdate={true}
                                            isReply={false}
                                            setToggle={setReplyToggle}
                                            setComment={setComment}
                                            comment={comment}
                                            focus={inputRef}
                                            cancelled={cancelled}
                                            setCancelled={setCancelled}
                                            setIsUpdateForm={setIsUpdateForm}
                                            isUpdateForm={isUpdateForm}
                                        />
                                    )}
                                    <ReplyListBox>
                                        {test2
                                            .filter((no) => no.parentNo === parent.no)
                                            .map((child) => (
                                                <div className="reply_wrap" key={child.no}>
                                                    <dt>
                                                        <b>
                                                            {child.name} <em>{child.regDate}</em>
                                                        </b>
                                                        <p>{child.content}</p>
                                                    </dt>
                                                    <dd>
                                                        <em>신고</em>

                                                        {!!auth?.accessToken && auth.user?.id === child.userId && (
                                                            <>
                                                                <em
                                                                    onClick={() =>
                                                                        replyUpdateForm(child.no, child.content)
                                                                    }
                                                                >
                                                                    수정
                                                                </em>
                                                                <em>삭제</em>
                                                            </>
                                                        )}
                                                    </dd>

                                                    {isReplyUpdateForm && selectedReplyIndex === child.no && (
                                                        <CommentForm
                                                            isUpdate={true}
                                                            isReply={true}
                                                            setReply={setReply}
                                                            reply={reply}
                                                            focus={inputRef}
                                                            cancelled={cancelled}
                                                            setCancelled={setCancelled}
                                                            setIsUpdateForm={setIsReplyUpdateForm}
                                                            isUpdateForm={isReplyUpdateForm}
                                                        />
                                                    )}
                                                </div>
                                            ))}
                                    </ReplyListBox>
                                </CommentListBox>
                            ))}
                        </div>
                    </CommentListWrap>
                </CommentWrap>
            )}
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

const CommentListWrap = styled.div`
    .comment_box {
        margin-top: 10px;
        display: flex;
        flex-direction: column;
        gap: 15px;
    }
`;

const CommentListBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-bottom: 10px;
    ${CommentList}
`;

const ReplyListBox = styled.div`
    padding: 0 0 0 40px;
    margin: 5px 0;

    .reply_wrap {
        display: flex;
        flex-direction: column;
        grid-gap: 10px;
        margin-bottom: 20px;
    }
    ${CommentList}
`;
