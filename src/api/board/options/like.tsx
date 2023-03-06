import { api } from '@/api';
import { ILikeCount, IViewCount } from '@/types/board';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';

const putBoardLike = (data: ILikeCount) => {
    return api.put({ url: '/api/boards/like', data });
};

const putNewsLike = (data: ILikeCount) => {
    return api.put({ url: '/api/news/like', data });
};

export const useBoardLikeMutation = (type?: string) => {
    return useMutation<AxiosResponse, AxiosError, ILikeCount>((data): any => {
        return type === 'news' ? putNewsLike(data) : putBoardLike(data);
    });
};
