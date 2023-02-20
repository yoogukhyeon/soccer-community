import { IBoard } from '@/types/board';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { api } from '..';
import { queryClient } from '../../';

const getList = (category: string | any, startNum: string | any, endNum: string | any) => {
    return api.get({ url: `/api/boards?category=${category}&startNum=${startNum}&endNum=${endNum}` });
};

export const useBoardQuery = (category: string | any, startNum: string | any, endNum: string | any) => {
    return useQuery(['boardList'], () => getList(category, startNum, endNum), { select: (data) => data?.data?.data });
};

//프리페치
export const useBoardPreFetchQuery = (category: string | any, startNum: string | any, endNum: string | any) => {
    return queryClient.prefetchQuery(['boardList', category, startNum], () => getList(category, startNum, endNum));
};

const getDetail = (id: number) => {
    return api.get({ url: `/api/boards/detail/${id}` });
};

export const useBoardDetailQuery = (id: number) => {
    return useQuery(['boardDetail', id], () => getDetail(id), {
        select: (data) => data?.data?.data?.board[0],
        refetchOnWindowFocus: false,
    });
};

const postBoard = (data: IBoard) => {
    return api.post({ url: '/api/boards', data });
};

const putBoard = (data: IBoard) => {
    return api.put({ url: `/api/boards`, data });
};

export const useBoardMutation = (isUpdate: boolean) => {
    return useMutation<AxiosResponse, AxiosError, IBoard>((data): any => {
        return isUpdate ? putBoard(data) : postBoard(data);
    });
};

const deleteBoard = (data: number) => {
    return api.delete({ url: `/api/boards`, data });
};

export const useDeleteMutation = () => {
    return useMutation<AxiosResponse, AxiosError, any>((data): any => {
        return deleteBoard(data);
    });
};
