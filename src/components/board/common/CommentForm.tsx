import React from 'react';
import styled from 'styled-components';
import ReactTextareaAutosize from 'react-textarea-autosize';
import { FormEvent, SetStateAction, useState, Dispatch } from 'react';
interface IProps {
    comment?: string;
    setComment?: any;
    reply?: string;
    setReply?: any;
    isUpdate: boolean;
    isReply: boolean;
    setToggle?: Dispatch<SetStateAction<boolean>> | any;
    focus?: any;
    cancelled?: Dispatch<SetStateAction<boolean>> | any;
    setCancelled?: any;
    setIsUpdateForm?: any;
    isUpdateForm?: Dispatch<SetStateAction<boolean>> | any;
}

export default function CommentForm({
    focus,
    setReply,
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
}: IProps) {
    const submitComment = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        alert('apply');
    };

    return (
        <CommentWrap onSubmit={submitComment}>
            <ReactTextareaAutosize
                value={isReply ? reply : comment}
                placeholder={`${
                    !isReply
                        ? `댓글을 ${!isUpdate ? '작성' : '수정'} 해주세요. (5자 이상)`
                        : `답글을 ${!isUpdate ? '작성' : '수정'} 해주세요. (5자 이상)`
                }`}
                onChange={(e) => (isReply ? setReply(e.target.value) : setComment(e.target.value))}
                maxRows={5}
                minLength={5}
                maxLength={1000}
            />
            <CommentBtn>
                <span className="comment_length">
                    <em>{isReply ? reply?.length : comment?.length}</em> / 1000
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
