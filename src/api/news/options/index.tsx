import { api } from '@/api';
import { IRecommend } from '@/types/news';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';

const putNewsRecommend = (data: IRecommend) => {
    return api.put({ url: '/api/news/recommend', data });
};

export const useNewsRecommentMutation = () => {
    return useMutation<AxiosResponse, AxiosError, IRecommend>((data): any => {
        return putNewsRecommend(data);
    });
};
