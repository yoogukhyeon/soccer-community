import React, { Dispatch, SetStateAction } from 'react';
import { useEffect, useRef, useState } from 'react';
import { HiHeart, HiOutlineHeart, HiOutlineLink } from 'react-icons/hi';
import { CommentAndReplyList } from '../../common/style/common';
import styled from 'styled-components';
import CommentForm from '@/components/board/common/CommentForm';
import authAtom from '@/stores/authAtom';
import { useAtom } from 'jotai';
import { useCommentDeleteMutation, useReplyDeleteMutation } from '@/api/comment';
import { IDeleteData } from '@/types/comment';
import { useQueryClient } from '@tanstack/react-query';
import { useConfirm } from '@/hooks/useConfirm';
import { storage } from '@/assets/storage';
import { useCommentAndReplyMutation } from '@/api/comment/options/like';
interface Lists {
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
    replyList: ReplyList[];
}

export default function CommentList({
    comment,
    setComment,
    setCommentUpdate,
    commentUpdate,
    lists,
    replyList,
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
    const { mutate: commentDeleteMutate } = useCommentDeleteMutation();
    const { mutate: replyDeleteMutate } = useReplyDeleteMutation();
    const { mutate: commentAndReplyMutate } = useCommentAndReplyMutation();
    const queryClient = useQueryClient();

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

    //comment 수정
    const [isReplyUpdateForm, setIsReplyUpdateForm] = useState<boolean>(false);
    const [selectedReplyIndex, setSelectedReplyIndex] = useState<number>();

    const replyUpdateForm = (no: number, content: string): void => {
        setIsReplyUpdateForm(true);
        setSelectedReplyIndex(no);
        setReply(content);
    };

    const deleteComment = (no: number, id: number, type: string) => {
        const data: IDeleteData = {
            no,
            id,
        };

        if (type === 'comment') {
            useConfirm('댓글을 삭제하시겠습니까?', () => {
                commentDeleteMutate(data, {
                    onSuccess: (res) => {
                        if (res.data.message === 'success') {
                            alert('댓글을 삭제했습니다.');
                            queryClient.invalidateQueries(['commentList', boardNo]);
                        }
                    },
                    onError: (err) => {
                        console.log('err', err);
                        console.error(err);
                    },
                });
            });
        } else {
            useConfirm('답글을 삭제하시겠습니까?', () => {
                replyDeleteMutate(data, {
                    onSuccess: (res) => {
                        if (res.data.message === 'success') {
                            alert('답글을 삭제했습니다.');
                            queryClient.invalidateQueries(['replyList', boardNo]);
                        }
                    },
                    onError: (err) => {
                        console.log('err', err);
                        console.error(err);
                    },
                });
            });
        }
    };

    const [isCommentLike, setIsCommentLike] = useState<boolean>(false);
    const [commentIndex, setCommentIndex] = useState<number[]>([]);
    const [isReplyLike, setIsReplyLike] = useState<boolean>(false);
    const [replyIndex, setReplyIndex] = useState<number[]>([]);
    const onClickCommentLike = (no: number) => {
        const data = {
            no,
            type: 'comment',
        };
        commentAndReplyMutate(data, {
            onSuccess: (res) => {
                if (res?.data?.message === 'success') {
                    const hitLike = storage('commentLikes', no);

                    if (hitLike) {
                        queryClient.invalidateQueries(['commentList', boardNo]);
                        setCommentIndex([...commentIndex, no]);
                        setIsCommentLike(true);
                    } else {
                        let chkLikes: any = localStorage.getItem('commentLikes');
                        chkLikes = JSON.parse(chkLikes);
                        const newLikes = chkLikes.filter((val: number) => val !== no);
                        localStorage.setItem('commentLikes', JSON.stringify(newLikes));
                        const newCommentIndex = commentIndex.filter((val: number) => val !== no);
                        setCommentIndex([...newCommentIndex]);
                        setIsCommentLike(false);
                    }
                }
            },
            onError: (err) => {
                console.log('err', err);
                console.error(err);
            },
        });
    };

    const onClickReplyLike = (no: number) => {
        const data = {
            no,
            type: 'reply',
        };
        commentAndReplyMutate(data, {
            onSuccess: (res) => {
                if (res?.data?.message === 'success') {
                    const hitLike = storage('replyLikes', no);
                    if (hitLike) {
                        queryClient.invalidateQueries(['replyList', boardNo]);
                        setReplyIndex([...replyIndex, no]);
                        setIsReplyLike(true);
                    } else {
                        let chkLikes: any = localStorage.getItem('replyLikes');
                        chkLikes = JSON.parse(chkLikes);
                        const newLikes = chkLikes.filter((val: number) => val !== no);
                        localStorage.setItem('replyLikes', JSON.stringify(newLikes));
                        setIsReplyLike(false);
                    }
                }
            },
            onError: (err) => {
                console.log('err', err);
                console.error(err);
            },
        });
    };

    useEffect(() => {
        let chkLikes: any = localStorage.getItem('commentLikes');
        chkLikes = JSON.parse(chkLikes);
        if (chkLikes?.includes(lists.no)) {
            setCommentIndex([...commentIndex, lists.no]);
            setIsCommentLike(true);
        } else {
            setIsCommentLike(false);
        }

        let replyArr = [];
        for (let i = 0; i < replyList?.length; i++) {
            let replyLikes: any = localStorage.getItem('replyLikes');
            replyLikes = JSON.parse(replyLikes);
            if (replyLikes?.includes(replyList[i].no)) {
                replyArr.push(replyList[i].no);
                setIsReplyLike(true);
            } else {
                setIsReplyLike(false);
            }
        }
        setReplyIndex(replyArr);
    }, []);

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
                <em className="like_box" onClick={() => onClickCommentLike(lists.no)}>
                    {isCommentLike && commentIndex.includes(lists.no) ? (
                        <HiHeart size={18} />
                    ) : (
                        <HiOutlineHeart size={18} />
                    )}
                    {lists.likes}
                </em>
                <em onClick={() => alert('서비스 준비중입니다.')}>신고</em>
                {!!auth?.accessToken && auth.user?.id === lists.id && (
                    <>
                        <em onClick={() => updateForm(lists.no, lists.content)}>수정</em>
                        <em onClick={() => deleteComment(lists.no, lists.id, 'comment')}>삭제</em>
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
                {replyList
                    .filter((data: any) => data.parentNo === lists.no)
                    .map((child: any) => (
                        <div className="reply_wrap" key={child.no}>
                            <dt>
                                <b>
                                    {child.name} <em>{child.regDate}</em>
                                </b>
                                <p>{child.content}</p>
                            </dt>
                            <dd>
                                <em className="like_box" onClick={() => onClickReplyLike(child.no)}>
                                    {isReplyLike && replyIndex.includes(child.no) ? (
                                        <HiHeart size={18} />
                                    ) : (
                                        <HiOutlineHeart size={18} />
                                    )}
                                    {child.likes}
                                </em>
                                <em onClick={() => alert('서비스 준비중입니다.')}>신고</em>

                                {!!auth?.accessToken && auth.user?.id === child.id && (
                                    <>
                                        <em onClick={() => replyUpdateForm(child.no, child.content)}>수정</em>
                                        <em onClick={() => deleteComment(child.no, child.id, 'reply')}>삭제</em>
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
                                    replyNo={child.no}
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
