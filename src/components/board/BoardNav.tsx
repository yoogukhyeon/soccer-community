import React from 'react';
import styled from 'styled-components';
import Nav from './common/Nav';
import { Button } from '../common/Button';
import { useNavigate } from 'react-router-dom';

interface IProps {
    category: string;
}

export default function BoardNav({ category }: IProps) {
    const navigate = useNavigate();
    const goToWrite = () => {
        navigate('/boards/create');
    };

    return (
        <>
            <Wrap>
                <Nav category={category} />
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
`;
