import { api } from '@/api';
import { IViewCount } from '@/types/board';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';

const putBoardView = (data: IViewCount) => {
    return api.put({ url: `${process.env.REACT_APP_API_URL}/api/boards/view`, data });
};

export const useBoardViewMutation = () => {
    return useMutation<AxiosResponse, AxiosError, IViewCount>((data): any => {
        return putBoardView(data);
    });
};