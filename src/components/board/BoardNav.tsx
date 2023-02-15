import React from 'react';
import styled from 'styled-components';
import CategoryNav from './common/CategoryNav';
import { Button } from '../common/Button';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import authAtom from '@/stores/authAtom';
interface IProps {
    category: string;
}

export default function BoardNav({ category }: IProps) {
    const [auth] = useAtom(authAtom);
    const navigate = useNavigate();
    const goToWrite = () => {
        if (!auth?.accessToken) return alert('로그인 후 게시판을 이용해주세요.');
        navigate('/boards/create');
    };

    return (
        <>
            <Wrap>
                <CategoryNav category={category} />
                <BtnWrap>
                    <Button onClick={goToWrite} text="글 작성하기" />
                </BtnWrap>
            </Wrap>
        </>
    );
}

const Wrap = styled.div`
    width: 100%;
    position: relative;
`;

const BtnWrap = styled.div`
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);

    @media screen and (max-width: 768px) {
        & {
            position: fixed;
            top: 80%;
            right: 6%;
            transform: none;
            z-index: 9999;
        }
    }
`;
