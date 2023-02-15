import { useBoardDetailQuery } from '@/api/board';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { CgChevronLeft } from 'react-icons/cg';
import Loading from '@/components/common/Loading';
import BoardView from '@/components/board/BoardView';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import CommentForm from '@/components/board/common/CommentForm';

export default function index() {
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
        setReply(content);
    };

    const test: any[] = [
        {
            no: 1,
            name: 'pud',
            regDate: '2023-02-14',
            content: '욜로 11111',
        },
        {
            no: 2,
            name: 'pud',
            regDate: '2023-02-14',
            content: '욜로 2222',
        },
        {
            no: 3,
            name: 'pud',
            regDate: '2023-02-14',
            content: '욜로 33333',
        },
        {
            no: 4,
            name: 'pud',
            regDate: '2023-02-14',
            content: '욜로 44444',
        },
        {
            no: 5,
            name: 'pud',
            regDate: '2023-02-14',
            content: '욜로 55555',
        },
    ];

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
            {data && <BoardView view={data} />}
            {data && (
                <CommentWrap>
                    <CommentForm isUpdate={false} isReply={false} setComment={setComment} comment={comment} />
                    <p className="comment_count">댓글 3</p>
                    <CommentListWrap>
                        <div className="comment_box">
                            {test.map((val, idx) => (
                                <CommentListBox key={val.no}>
                                    <dt>
                                        <b>
                                            {val.name} <em>{val.regDate}</em>
                                        </b>
                                        <p>{val.content}</p>
                                    </dt>
                                    <dd>
                                        <em onClick={() => toggleReply(val.no)}>답글달기</em>
                                        <em>신고</em>
                                        <em onClick={() => updateForm(val.no, val.content)}>수정</em>
                                    </dd>

                                    {replyToggle && selectedCommentIndex === val.no && (
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

                                    {isUpdateForm && selectedCommentIndex === val.no && (
                                        <CommentForm
                                            isUpdate={true}
                                            isReply={true}
                                            setToggle={setReplyToggle}
                                            setReply={setReply}
                                            reply={reply}
                                            focus={inputRef}
                                            cancelled={cancelled}
                                            setCancelled={setCancelled}
                                            setIsUpdateForm={setIsUpdateForm}
                                            isUpdateForm={isUpdateForm}
                                        />
                                    )}
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

    dt {
        font-size: 18px;
        line-height: 24px;
        color: #000000;

        b {
            display: flex;
            justify-content: flex-start;
            gap: 5px;
            color: #323232;
            margin-bottom: 5px;

            em {
                display: inline-block;
                margin-left: 5px;
                color: #666666;
                font-weight: 400;
                font-size: 14px;
            }
        }

        p {
            font-size: 18px;
            line-height: 24px;
            font-weight: 400;
            color: #000000;
            word-break: break-all;
            white-space: pre-wrap;
        }
    }

    dd {
        display: flex;
        gap: 15px;
        font-size: 14px;
        font-weight: 500;

        > em {
            color: #666666;
            cursor: pointer;
        }
    }
`;
