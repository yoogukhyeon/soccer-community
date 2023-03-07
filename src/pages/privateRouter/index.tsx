import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
interface IProps {
    children: React.ReactNode | any;
}

export default function PrivateRouter({ children }: IProps) {
    const cookies = new Cookies();
    const accessToken = cookies.get('access_token');

    useEffect(() => {
        if (!accessToken) alert('로그인을 해주세요.');
    }, [accessToken]);
    return accessToken ? children : <Navigate to="/user/sign-in" />;
}
