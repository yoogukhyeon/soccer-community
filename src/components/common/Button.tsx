import React from 'react';
import styled from 'styled-components';
import { RiPencilFill } from 'react-icons/ri';
interface IButton {
    text: string;
    onClick: () => void;
}

export function Button({ text, onClick }: IButton) {
    return (
        <>
            <BtnWeb type="button" onClick={onClick}>
                {text}
            </BtnWeb>
            <BtnMo type="button" onClick={onClick}>
                <RiPencilFill />
            </BtnMo>
        </>
    );
}

const CommonBtn = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ffffff;
    background-color: #ff4c0e;
    border-radius: 10px;
    outline: none;
    font-weight: bold;
    border: none;
    box-shadow: 0.3rem 0.3rem 0.5rem rgba(0, 0, 0, 0.55);
    cursor: pointer;
`;

const BtnWeb = styled(CommonBtn)`
    width: 105px;
    height: 38px;

    @media screen and (max-width: 768px) {
        & {
            display: none;
        }
    }
`;

const BtnMo = styled(CommonBtn)`
    width: 78px;
    height: 30px;

    & > svg {
        font-size: 14px;
    }

    @media screen and (max-width: 768px) {
        & {
            display: block;
        }
    }

    @media screen and (min-width: 768px) {
        & {
            display: none;
        }
    }
`;
