import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import authAtom from '@/stores/authAtom';

interface IProps {
    children: React.ReactNode | any;
}

export default function PrivateRouter({ children }: IProps) {
    const [auth] = useAtom(authAtom);

    useEffect(() => {
        if (!auth?.accessToken) alert('로그인을 해주세요.');
    }, []);
    return auth?.accessToken ? children : <Navigate to="/" />;
}
