import { useMutation, useQuery } from '@tanstack/react-query';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { api } from '..';

const postSignUp = (data: any) => {
    return api.post({ url: `${process.env.REACT_APP_API_URL}/api/user/sign-up`, data });
};

const postSignIn = (data: any) => {
    return api.post({ url: `${process.env.REACT_APP_API_URL}/api/user/sign-in`, data });
};

export const useSignUpMutation = () => {
    return useMutation<AxiosResponse, AxiosError, any>((data): any => {
        return postSignUp(data);
    });
};
export const useSignInMutation = () => {
    return useMutation<AxiosResponse, AxiosError, any>((data): any => {
        return postSignIn(data);
    });
};

export const getUser = (accessToken: string, refreshToken: string) => {
    return axios.get(`${process.env.REACT_APP_API_URL}/api/user/auth`, {
        headers: { Authorization: `Bearer ${accessToken}`, Refresh: `${refreshToken}` },
    });
};
