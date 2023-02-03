import axios, { AxiosInstance, AxiosRequestConfig, Method } from 'axios';

const createAxios = axios.create({
    headers: {
        Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
    },
});

const createApi = (axiosInstance: AxiosInstance, methodType: Method) => (config: AxiosRequestConfig) => {
    const _config = {
        method: methodType,
        url: config.url,
        data: {
            ...config.data,
        },
    };

    return axiosInstance(_config);
};

export const api = {
    get: createApi(createAxios, 'GET'),
    post: createApi(createAxios, 'POST'),
    put: createApi(createAxios, 'PUT'),
    delete: createApi(createAxios, 'DELETE'),
};
