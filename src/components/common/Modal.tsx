import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { IoClose } from 'react-icons/io5';
interface IProps {
    content: React.ReactNode;
    setToggleModal: Dispatch<SetStateAction<boolean>>;
}

function Modal({ content, setToggleModal }: IProps) {
    const onClickToggle = () => {
        setToggleModal((prev) => !prev);
    };
    return (
        <ModalWrapper>
            <div className="modal_box">
                <div className="title_box">
                    <h2>개인정보처리방침</h2>
                    <i onClick={onClickToggle}>
                        <IoClose />
                    </i>
                </div>
                <div className="content_box">{content}</div>
            </div>
        </ModalWrapper>
    );
}

const ModalWrapper = styled.div`
    z-index: 20;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    > .modal_box {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate3d(-50%, -50%, 0);
        width: 600px;
        max-width: 80%;
        background: #ffffff;
        border-radius: 20px;
        padding: 20px;

        .title_box {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;

            h2 {
                font-size: 21px;
                font-weight: 600;
                color: #000000;
            }

            i {
                font-size: 21px;
                cursor: pointer;
                color: #000000;
            }
        }

        .content_box {
            font-size: 18px;
            overflow: auto;

            textarea {
                box-sizing: border-box;
                width: 100%;
                height: 100%;
                min-height: 60vh;
                padding: 10px;
                font-size: 13px;
                resize: none;
                border: none;
                line-height: 1.2;
                border: 1px solid #d6d6d6;
                border-radius: 10px;
                font-family: Pretendard, 'sans-serif';
            }
            textarea:focus {
                outline: none;
            }
        }
    }
`;

export default Modal;
