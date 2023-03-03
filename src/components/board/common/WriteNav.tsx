import React from 'react';
import styled from 'styled-components';
import { CgChevronLeft } from 'react-icons/cg';
import { useNavigate, useLocation } from 'react-router-dom';

interface IProps {
    readonly isUpdate?: boolean;
    readonly type?: string;
}

export default function WriteNav({ isUpdate, type }: IProps) {
    const navigate = useNavigate();
    const { state } = useLocation();

    const goToBack = () => navigate(state);

    return (
        <Nav>
            <div className="go_back" onClick={goToBack}>
                <i>
                    <CgChevronLeft />
                </i>
                <span>목록으로</span>
            </div>
            <h3>{isUpdate ? '글 수정하기' : '글 작성하기'} </h3>
        </Nav>
    );
}

const Nav = styled.div`
    color: #6a6a82;
    position: relative;
    display: flex;
    justify-content: center;
    margin: 30px 0;

    h3 {
        color: #29293f;
        font-size: 22px;
        font-weight: 600;
    }

    .go_back {
        position: absolute;
        left: 0;
        bottom: 0;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        cursor: pointer;

        i {
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
    span {
        font-weight: 600;
    }

    @media screen and (max-width: 768px) {
        h3 {
            font-size: 18px;
        }

        .go_back {
            i {
                font-size: 13px;
            }

            span {
                font-size: 13px;
            }
        }
    }
`;
