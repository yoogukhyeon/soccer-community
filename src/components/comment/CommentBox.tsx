import React from 'react';
import { useEffect, useRef, useState } from 'react';
import { CommentAndReplyList } from '../../common/style/common';
import styled from 'styled-components';
import CommentForm from '@/components/board/common/CommentForm';
import { useCommentQuery } from '@/api/comment';
import CommentList from './CommentList';

interface Data {
    no: number;
    id: number;
    boardNo: number;
    content: string;
    name: string;
    regDate: string;
    likes: number;
}

interface ReplyList {
    no: number;
    id: number;
    boardNo: number;
    parentNo: number;
    content: string;
    regDate: string;
    likes: number;
    name: string;
}

interface IProps {
    no: number;
    data: Data[];
    boardNo: number;
    id: number;
    replyList: ReplyList[];
}

export default function CommentBox({ id, boardNo, data, replyList }: IProps | any) {
    //댓글
    const [comment, setComment] = useState<string>('');
    //댓글 업데이트
    const [commentUpdate, setCommentUpdate] = useState<string>('');
    //답글
    const [reply, setReply] = useState<string>('');

    //reply toggle
    const [replyToggle, setReplyToggle] = useState<boolean>(false);

    const [selectedCommentIndex, setSelectedCommentIndex] = useState<number>();
    const inputRef = useRef<HTMLInputElement>(null);
    const [cancelled, setCancelled] = useState<boolean>(false);

    const [double, setDouble] = useState<number | null>(null);

    //comment 수정
    const [isUpdateForm, setIsUpdateForm] = useState<boolean>(false);

    return (
        <>
            <CommentForm
                id={id}
                boardNo={boardNo}
                isUpdate={false}
                isReply={false}
                setComment={setComment}
                comment={comment}
            />
            <p className="comment_count">댓글 {data.length > 0 ? data.length : 0}</p>
            <CommentListWrap>
                <div className="comment_box">
                    {data.length < 1 && <div className="comment_none">댓글이 없습니다.</div>}
                    {data.length > 0 &&
                        data.map((data: any) => (
                            <CommentList
                                key={data.no}
                                boardNo={boardNo}
                                lists={data}
                                replyList={replyList}
                                comment={comment}
                                setComment={setComment}
                                reply={reply}
                                setReply={setReply}
                                setCommentUpdate={setCommentUpdate}
                                commentUpdate={commentUpdate}
                                replyToggle={replyToggle}
                                setReplyToggle={setReplyToggle}
                                selectedCommentIndex={selectedCommentIndex}
                                setSelectedCommentIndex={setSelectedCommentIndex}
                                inputRef={inputRef}
                                setCancelled={setCancelled}
                                cancelled={cancelled}
                                setDouble={setDouble}
                                double={double}
                                setIsUpdateForm={setIsUpdateForm}
                                isUpdateForm={isUpdateForm}
                            />
                        ))}
                </div>
            </CommentListWrap>
        </>
    );
}

const CommentListWrap = styled.div`
    .comment_box {
        margin-top: 10px;
        display: flex;
        flex-direction: column;
        gap: 15px;
    }

    .comment_none {
        font-size: 18px;
        line-height: 24px;
        padding: 15px 0;
    }
`;
