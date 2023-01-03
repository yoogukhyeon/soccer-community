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

const getDetail = (id: number) => {
    return api.get({ url: `http://localhost:8080/boards/${id}` });
};

export const useBoardDetailQuery = (id: number) => {
    return useQuery(['boardDetail', id], () => getDetail(id), {
        select: (data) => data?.data,
        refetchOnWindowFocus: false,
    });
};

const postBoard = (data: IBoard) => {
    return api.post({ url: 'http://localhost:8080/boards', data });
};

const putBoard = (data: IBoard) => {
    return api.put({ url: `http://localhost:8080/boards/${data.id}`, data });
};

export const useBoardMutation = (isUpdate: boolean) => {
    return useMutation<AxiosResponse, AxiosError, IBoard>((data): any => {
        return isUpdate ? putBoard(data) : postBoard(data);
    });
};
