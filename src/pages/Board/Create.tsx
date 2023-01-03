import React, { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import { CgChevronLeft } from 'react-icons/cg';
import { useNavigate } from 'react-router-dom';
import Form from '@/components/board/common/Form';

export default function Create() {
    const navigate = useNavigate();

    const goToBack = () => navigate(-1);

    return (
        <FormWrap>
            <Nav>
                <div className="go_back" onClick={goToBack}>
                    <i>
                        <CgChevronLeft />
                    </i>
                    <span>목록으로</span>
                </div>
                <h3>글 작성하기</h3>
            </Nav>
            <Form />
        </FormWrap>
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

const FormWrap = styled.div`
    .editor_wrap {
        min-height: 450px;
        margin: 20px 0 40px 0;
    }
`;
