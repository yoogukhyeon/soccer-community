import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { api } from '..';
import { queryClient } from '../../';

const getList = (no: number) => {
    return api.get({ url: `/api/comments/${no}` });
};

export const useCommentQuery = (no: number) => {
    return useQuery(['commentList', no], () => getList(no), {
        select: (data) => data?.data,
    });
};

const postComment = (data: any) => {
    return api.post({ url: '/api/comments', data });
};

const putComment = (data: any) => {
    return api.put({ url: `/api/comments`, data });
};

export const useCommentMutation = (isUpdate: boolean) => {
    return useMutation<AxiosResponse, AxiosError, any>((data): any => {
        return isUpdate ? putComment(data) : postComment(data);
    });
};

const postReply = (data: any) => {
    return api.post({ url: '/api/comments', data });
};

const putReply = (data: any) => {
    return api.put({ url: `/api/comments`, data });
};

export const useReplyMutation = (isUpdate: boolean) => {
    return useMutation<AxiosResponse, AxiosError, any>((data): any => {
        return isUpdate ? putReply(data) : postReply(data);
    });
};
