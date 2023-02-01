import { IBoard } from '@/types/board';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { api } from '..';

const getList = (category: string | any) => {
    return api.get({ url: `http://43.200.239.246/api/boards?category=${category}` });
};

export const useBoardQuery = (category: string | any) => {
    return useQuery(['boardList'], () => getList(category), { select: (data) => data?.data?.data?.boardList });
};

const getDetail = (id: number) => {
    return api.get({ url: `http://43.200.239.246/boards/detail/${id}` });
};

export const useBoardDetailQuery = (id: number) => {
    return useQuery(['boardDetail', id], () => getDetail(id), {
        select: (data) => data?.data?.data?.board[0],
        refetchOnWindowFocus: false,
    });
};

const postBoard = (data: IBoard) => {
    return api.post({ url: 'http://43.200.239.246/api/boards', data });
};

const putBoard = (data: IBoard) => {
    return api.put({ url: `http://43.200.239.246/api/boards`, data });
};

export const useBoardMutation = (isUpdate: boolean) => {
    return useMutation<AxiosResponse, AxiosError, IBoard>((data): any => {
        return isUpdate ? putBoard(data) : postBoard(data);
    });
};

const deleteBoard = (data: number) => {
    return api.delete({ url: `http://wtemplate.shop/boards`, data });
};

export const useDeleteMutation = () => {
    return useMutation<AxiosResponse, AxiosError, any>((data): any => {
        return deleteBoard(data);
    });
};
