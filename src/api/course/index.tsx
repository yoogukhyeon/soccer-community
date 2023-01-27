import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { api } from '..';

const getList = () => {
    return api.get({ url: 'http://wtemplate.shop/home' });
};

export const useCourseQuery = () => {
    return useQuery(['boardList'], () => getList(), { select: (data) => data?.data?.data });
};
