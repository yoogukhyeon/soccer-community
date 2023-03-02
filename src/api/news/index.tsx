import { IBoard } from '@/types/board';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { api } from '..';
import { queryClient } from '../../';

const getList = (category: string | any, startNum: string | any, endNum: string | any) => {
    return api.get({ url: `/api/news?category=${category}&startNum=${startNum}&endNum=${endNum}` });
};

export const useNewsQuery = (category: string | any, startNum: string | any, endNum: string | any) => {
    return useQuery(['newsList', category, startNum, endNum], () => getList(category, startNum, endNum), {
        select: (data) => data?.data?.data,
        keepPreviousData: true,
    });
};

const postBoard = (data: IBoard) => {
    return api.post({ url: '/api/news', data });
};

const putBoard = (data: IBoard) => {
    return api.put({ url: `/api/news`, data });
};

export const useNewsMutation = (isUpdate: boolean) => {
    return useMutation<AxiosResponse, AxiosError, IBoard>((data): any => {
        return isUpdate ? putBoard(data) : postBoard(data);
    });
};

const getCategoryList = () => {
    return api.get({ url: `/api/news/category` });
};

export const useCategoryQuery = () => {
    return useQuery(['categoryList'], () => getCategoryList(), {
        select: (data) => data?.data?.data,
        keepPreviousData: true,
    });
};