import { useMutation, useQuery } from '@tanstack/react-query';
import { api } from '..';
import { queryClient } from '../../';
const mainList = () => {
    return api.get({ url: 'http://wtemplate.shop/home' });
};

export const useCourseQuery = () => {
    return useQuery(['courseList'], () => mainList(), { select: (data) => data?.data?.data });
};

const courseList = (channel: string | null, video: string | null) => {
    return api.get({ url: `http://wtemplate.shop/course?channel=${channel}&video=${video}` });
};

export const useCourseListQuery = (channel: string | null, video: string | null) => {
    return useQuery(['courseList', video], () => courseList(channel, video), {
        select: (data) => data?.data?.data,
        refetchOnWindowFocus: false,
        staleTime: 2000,
        keepPreviousData: true,
    });
};

export const useCourseListPreFetchQuery = (channel: string | null, video: string | null) => {
    return queryClient.prefetchQuery(['courseList', video], () => courseList(channel, video));
};
