import { api } from '@/api';
import { ILikeCount } from '@/types/comment';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';

const putCommentView = (data: ILikeCount) => {
    return api.put({ url: `${process.env.REACT_APP_API_URL}/api/comments/like`, data });
};

const putReplyView = (data: ILikeCount) => {
    return api.put({ url: `${process.env.REACT_APP_API_URL}/api/comments/reply/like`, data });
};

export const useCommentAndReplyMutation = () => {
    return useMutation<AxiosResponse, AxiosError, ILikeCount>((data): any => {
        return data.type === 'comment' ? putCommentView(data) : putReplyView(data);
    });
};
