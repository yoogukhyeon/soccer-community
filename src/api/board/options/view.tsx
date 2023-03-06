import { api } from '@/api';
import { IViewCount } from '@/types/board';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';

const putBoardView = (data: IViewCount) => {
    return api.put({ url: `${process.env.REACT_APP_API_URL}/api/boards/view`, data });
};

const putNewsView = (data: IViewCount) => {
    return api.put({ url: `${process.env.REACT_APP_API_URL}/api/news/view`, data });
};

export const useBoardViewMutation = (type?: string) => {
    return useMutation<AxiosResponse, AxiosError, IViewCount>((data): any => {
        return type === 'news' ? putNewsView(data) : putBoardView(data);
    });
};
