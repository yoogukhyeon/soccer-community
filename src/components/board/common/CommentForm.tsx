import React from 'react';
import styled from 'styled-components';
import ReactTextareaAutosize from 'react-textarea-autosize';
import { FormEvent, SetStateAction, useState, Dispatch } from 'react';
import { useCommentMutation, useReplyMutation } from '@/api/comment';
import { ICommentData } from '@/types/comment';
import { useQueryClient } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import authAtom from '@/stores/authAtom';
interface IProps {
    comment?: string;
    setComment?: Dispatch<SetStateAction<boolean>> | any;
    commentUpdate?: string;
    setCommentUpdate?: Dispatch<SetStateAction<boolean>> | any;
    reply?: string;
    setReply?: Dispatch<SetStateAction<boolean>> | any;
    isUpdate: boolean;
    isReply: boolean;
    setToggle?: Dispatch<SetStateAction<boolean>> | any;
    focus?: any;
    cancelled?: Dispatch<SetStateAction<boolean>> | any;
    setCancelled?: any;
    setIsUpdateForm?: any;
    isUpdateForm?: Dispatch<SetStateAction<boolean>> | any;
    boardNo?: number;
    commentNo?: number;
    id?: number | any;
    replyNo?: number | any;
}

export default function CommentForm({
    focus,
    setReply,
    setCommentUpdate,
    commentUpdate,
    reply,
    setComment,
    comment,
    isReply,
    isUpdate,
    setToggle,
    cancelled,
    setCancelled,
    setIsUpdateForm,
    isUpdateForm,
    boardNo,
    commentNo,
    id,
    replyNo,
}: IProps) {
    const { mutate: commentMutate, isLoading: isCommentLoading } = useCommentMutation(isUpdate);
    const { mutate: replyMutate, isLoading: isReplyLoading } = useReplyMutation(isUpdate);
    const [auth] = useAtom(authAtom);
    const queryClient = useQueryClient();

    const submitComment = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!auth?.accessToken) {
            if (isReply) {
                setReply('');
                setToggle((prev: boolean) => !prev);
                return alert('로그인 후에 대댓글을 작성해주세요.');
            } else {
                setComment('');
                return alert('로그인 후에 댓글을 작성해주세요.');
            }
        }

        let data: ICommentData | any = {};

        // 업데이트시
        if (isUpdate) {
            data = {
                content: commentUpdate,
                no: commentNo,
                id,
            };
        }

        //업데이트 아닐경우
        if (!isUpdate) {
            data = {
                content: comment,
                boardNo,
                id,
            };
        }

        //답글 등록시
        if (isReply) {
            data = {
                content: reply,
                boardNo,
                commentNo,
                id,
            };
        }

        if (isReply && isUpdate) {
            data = {
                content: reply,
                no: replyNo,
                id,
            };
        }

        //댓글 로직
        if (!isReply) {
            commentMutate(data, {
                onSuccess: (res) => {
                    if (res.data.message === 'success') {
                        alert('댓글 작성을 완료했습니다.');
                        queryClient.invalidateQueries(['commentList', boardNo]);
                        if (isUpdate) {
                            setCommentUpdate('');
                            setIsUpdateForm(false);
                        } else {
                            setComment('');
                        }
                    }
                },
                onError: (err) => {
                    console.log('err', err);
                    console.error(err);
                },
            });
        } else {
            //대댓글 로직
            replyMutate(data, {
                onSuccess: (res) => {
                    if (res.data.message === 'success') {
                        alert('답글 작성을 완료했습니다.');
                        queryClient.invalidateQueries(['replyList', boardNo]);
                        setReply('');
                        if (isUpdate) {
                            setIsUpdateForm(false);
                        } else {
                            setToggle(false);
                        }
                    }
                },
                onError: (err) => {
                    console.log('err', err);
                    console.error(err);
                },
            });
        }
    };

    return (
        <CommentWrap onSubmit={submitComment}>
            <ReactTextareaAutosize
                value={isReply ? reply : isUpdateForm ? commentUpdate : comment}
                placeholder={`${
                    !isReply
                        ? `댓글을 ${!isUpdate ? '작성' : '수정'} 해주세요. (5자 이상)`
                        : `답글을 ${!isUpdate ? '작성' : '수정'} 해주세요. (5자 이상)`
                }`}
                onChange={(e) =>
                    isReply
                        ? setReply(e.target.value)
                        : isUpdateForm
                        ? setCommentUpdate(e.target.value)
                        : setComment(e.target.value)
                }
                maxRows={5}
                minLength={5}
                maxLength={1000}
            />
            <CommentBtn>
                <span className="comment_length">
                    <em>{isReply ? reply?.length : isUpdateForm ? commentUpdate?.length : comment?.length}</em> / 1000
                </span>
                <div className="btn_wrap">
                    <button type="submit">{!isUpdate ? '등록' : '수정'}</button>
                    {(isUpdate || isReply) && (
                        <button
                            onClick={
                                isUpdateForm
                                    ? () => {
                                          setIsUpdateForm((prev: boolean) => !prev);
                                      }
                                    : () => {
                                          setToggle((prev: boolean) => !prev);
                                          setCancelled(false);
                                          setReply('');
                                      }
                            }
                        >
                            <div ref={focus} className={`comment_cancel ${cancelled ? 'active' : ''}`}>
                                취소
                            </div>
                        </button>
                    )}
                </div>
            </CommentBtn>
        </CommentWrap>
    );
}

const CommentWrap = styled.form`
    & {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-end;
        margin: 20px 0;
        padding: 15px;
        border-radius: 10px;
        border: 1px solid #d6d6d6;
        :focus-within {
            border: 1px solid #ff4c0e;
        }

        > textarea {
            width: 100%;
            height: 100%;
            border: none;
            resize: none;
            font-size: 16px;
            line-height: 22px;
            padding: 5px;
            color: #000000;
            :focus {
                outline: none;
            }
            ::placeholder {
                color: #a2a2a2;
            }
        }
    }
`;

const CommentBtn = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    padding: 5px;

    .comment_length {
        white-space: nowrap;
        color: #666666;
        line-height: 18px;
        font-size: 12px;
    }

    .btn_wrap {
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        > button {
            background-color: transparent;
            outline: none;
            border: none;
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: hidden;
            white-space: nowrap;
            cursor: pointer;
            margin-left: 7px;
            color: #ff4c0e;
            font-size: 16px;
            font-weight: 600;
            font-family: 'Noto Sans KR', sans-serif !important;
        }

        > button + button {
            margin-left: 0;
        }

        .comment_cancel {
            font-size: 16px;
            font-weight: 600;
            color: #a2a2a2;
        }

        .comment_cancel.active {
            transform-origin: 50% 0%;
            animation: shake 2s linear infinite;
            animation-delay: 0.2s;
        }
        @keyframes shake {
            0% {
                transform: rotate(0deg);
            }
            10% {
                transform: rotate(45deg);
            }
            20% {
                transform: rotate(-45deg);
            }
            30% {
                transform: rotate(30deg);
            }
            40% {
                transform: rotate(-30deg);
            }
            50% {
                transform: rotate(10deg);
            }
            60% {
                transform: rotate(-10deg);
            }
            70% {
                transform: rotate(0deg);
            }
            100% {
                transform: rotate(0deg);
            }
        }
    }
`;
