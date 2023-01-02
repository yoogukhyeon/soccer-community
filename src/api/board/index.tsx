import { IBoard } from '@/types/board';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { api } from '..';

const getList = () => {
    return api.get({ url: 'http://localhost:8080/boards' });
};

export const useBoardQuery = () => {
    return useQuery(['boardList'], () => getList(), { select: (data) => data?.data });
};

const postBoard = (data: IBoard) => {
    return api.post({ url: 'http://localhost:8080/boards', data });
};

export const useBoardMutation = () => {
    return useMutation<AxiosResponse, AxiosError, IBoard>((data): any => postBoard(data));
};
