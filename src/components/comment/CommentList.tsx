import React, { Dispatch, SetStateAction } from 'react';
import { useEffect, useRef, useState } from 'react';
import { CommentAndReplyList } from '../../common/style/common';
import styled from 'styled-components';
import CommentForm from '@/components/board/common/CommentForm';
import authAtom from '@/stores/authAtom';
import { useAtom } from 'jotai';
interface Lists {
    no: number;
    id: number;
    boardNo: number;
    content: string;
    name: string;
    regDate: string;
    likes: number;
}

interface IProps {
    comment?: string;
    setComment?: Dispatch<SetStateAction<any>>;
    lists: Lists;
    reply: string;
    setCommentUpdate: Dispatch<SetStateAction<string>>;
    commentUpdate: string;
    setReply: Dispatch<SetStateAction<string>>;
    replyToggle: Dispatch<SetStateAction<boolean>>;
    setReplyToggle: Dispatch<SetStateAction<boolean>>;
    selectedCommentIndex: number;
    setSelectedCommentIndex: Dispatch<SetStateAction<number>>;
    inputRef: any;
    setCancelled: Dispatch<SetStateAction<boolean>>;
    cancelled: boolean;
    setDouble: Dispatch<SetStateAction<number | null>>;
    double: number | null;
    setIsUpdateForm: Dispatch<SetStateAction<boolean>>;
    isUpdateForm: boolean;
    boardNo: number;
}

export default function CommentList({
    comment,
    setComment,
    setCommentUpdate,
    commentUpdate,
    lists,
    reply,
    setReply,
    replyToggle,
    setReplyToggle,
    selectedCommentIndex,
    setSelectedCommentIndex,
    inputRef,
    setCancelled,
    cancelled,
    setDouble,
    double,
    setIsUpdateForm,
    isUpdateForm,
    boardNo,
}: IProps | any) {
    const [auth] = useAtom(authAtom);

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
        setCommentUpdate(content);
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
        <CommentListBox>
            <dt>
                <b>
                    {lists.name} <em>{lists.regDate}</em>
                </b>
                <p>{lists.content}</p>
            </dt>
            <dd>
                <em onClick={() => toggleReply(lists.no)}>답글달기</em>
                <em>신고</em>
                {!!auth?.accessToken && auth.user?.id === lists.id && (
                    <>
                        <em onClick={() => updateForm(lists.no, lists.content)}>수정</em>
                        <em>삭제</em>
                    </>
                )}
            </dd>

            {replyToggle && selectedCommentIndex === lists.no && (
                <CommentForm
                    isUpdate={false}
                    isReply={true}
                    setToggle={setReplyToggle}
                    setReply={setReply}
                    reply={reply}
                    focus={inputRef}
                    cancelled={cancelled}
                    setCancelled={setCancelled}
                    boardNo={boardNo}
                    commentNo={lists.no}
                    id={auth.user?.id}
                />
            )}
            {isUpdateForm && selectedCommentIndex === lists.no && (
                <CommentForm
                    isUpdate={true}
                    isReply={false}
                    setToggle={setReplyToggle}
                    setCommentUpdate={setCommentUpdate}
                    commentUpdate={commentUpdate}
                    focus={inputRef}
                    cancelled={cancelled}
                    setCancelled={setCancelled}
                    setIsUpdateForm={setIsUpdateForm}
                    isUpdateForm={isUpdateForm}
                    commentNo={lists.no}
                    id={lists.id}
                />
            )}
            <ReplyListBox>
                {test2
                    .filter((no) => no.parentNo === lists.no)
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
                                        <em onClick={() => replyUpdateForm(child.no, child.content)}>수정</em>
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
                                    commentNo={child.no}
                                    id={child.id}
                                />
                            )}
                        </div>
                    ))}
            </ReplyListBox>
        </CommentListBox>
    );
}

const CommentListBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-bottom: 10px;
    ${CommentAndReplyList}
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
    ${CommentAndReplyList}
`;
