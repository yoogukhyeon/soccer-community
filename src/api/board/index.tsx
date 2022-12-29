import { api } from '..';

export const getList = () => {
    return api.get({ url: 'http://localhost:8080/boards' });
};
