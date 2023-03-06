import { api } from '@/api';
import { IViewCount } from '@/types/board';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';

const putBoardView = (data: IViewCount) => {
    return api.put({ url: '/api/boards/view', data });
};

const putNewsView = (data: IViewCount) => {
    return api.put({ url: '/api/news/view', data });
};

export const useBoardViewMutation = (type?: string) => {
    return useMutation<AxiosResponse, AxiosError, IViewCount>((data): any => {
        return type === 'news' ? putNewsView(data) : putBoardView(data);
    });
};
