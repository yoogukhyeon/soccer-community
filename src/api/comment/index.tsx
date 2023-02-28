import { ICommentData, IDeleteData, IReplyData } from '@/types/comment';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { api } from '..';
import { queryClient } from '../../';

const getCommentList = (no: number) => {
    return api.get({ url: `/api/comments/${no}` });
};

export const useCommentQuery = (no: number) => {
    return useQuery(['commentList', no], () => getCommentList(no), {
        select: (data) => data?.data,
    });
};

const postComment = (data: ICommentData) => {
    return api.post({ url: '/api/comments', data });
};

const putComment = (data: ICommentData) => {
    return api.put({ url: `/api/comments`, data });
};

export const useCommentMutation = (isUpdate: boolean) => {
    return useMutation<AxiosResponse, AxiosError, ICommentData>((data): any => {
        return isUpdate ? putComment(data) : postComment(data);
    });
};

const deleteComment = (data: number) => {
    return api.delete({ url: `/api/comments`, data });
};

export const useCommentDeleteMutation = () => {
    return useMutation<AxiosResponse, AxiosError, any>((data): any => {
        return deleteComment(data);
    });
};

const getReplyList = (no: number) => {
    return api.get({ url: `/api/comments/reply/${no}` });
};

export const useReplyQuery = (no: number) => {
    return useQuery(['replyList', no], () => getReplyList(no), {
        select: (data) => data?.data,
    });
};

const postReply = (data: IReplyData) => {
    return api.post({ url: '/api/comments/reply', data });
};

const putReply = (data: IReplyData) => {
    return api.put({ url: `/api/comments/reply`, data });
};

export const useReplyMutation = (isUpdate: boolean) => {
    return useMutation<AxiosResponse, AxiosError, IReplyData>((data): any => {
        return isUpdate ? putReply(data) : postReply(data);
    });
};

const deleteReply = (data: number) => {
    return api.delete({ url: `/api/comments/reply`, data });
};

export const useReplyDeleteMutation = () => {
    return useMutation<AxiosResponse, AxiosError, any>((data): any => {
        return deleteReply(data);
    });
};
