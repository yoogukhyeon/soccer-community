import React, { useState } from 'react';
import styled from 'styled-components';
import { ContainerDiv } from '@/common/style/common';
import { HeaderAndFooter } from '@/common/style/common';
import { useNavigate } from 'react-router-dom';
import Modal from '../common/Modal';
import { personalPolicy } from '@/constants/policy';
export default function Footer() {
    const navigate = useNavigate();
    const goToHome = () => {
        navigate('/');
    };

    const [toggleModal, setToggleModal] = useState<boolean>(false);

    const onClickModal = () => {
        setToggleModal((prev) => !prev);
    };
    return (
        <FooterWrap>
            <ContainerDiv>
                <div className="logo_box">
                    <span className="logo" onClick={goToHome}>
                        <img src="/img/logo.png" alt="LOGO" />
                    </span>
                </div>
                <div className="info_box">
                    <ul>
                        <li>© 2023 F&FK LTD All Rights Reserved.</li>
                        <li>F&FK 운영자: rnrgus5897@gmail.com</li>
                        <li>개인정보책임: 유국현</li>
                        <li onClick={onClickModal}>개인정보처리방침</li>
                    </ul>
                </div>
                {toggleModal && (
                    <Modal
                        setToggleModal={setToggleModal}
                        content={<textarea value={`${personalPolicy}`} readOnly />}
                    />
                )}
            </ContainerDiv>
        </FooterWrap>
    );
}

const FooterWrap = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background-color: #29293f;
    color: #fff;
    padding: 20px 0;

    .logo {
        display: inline-block;
        width: 50px;
        cursor: pointer;
        transition: all 0.8s ease-in-out;

        > img {
            width: 100%;
            height: auto;
        }
    }

    .info_box {
        margin: 15px 0;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
    }

    .info_box li {
        letter-spacing: 0.5px;
        line-height: 26px;

        :last-child {
            cursor: pointer;
        }
    }

    ${HeaderAndFooter}
`;
