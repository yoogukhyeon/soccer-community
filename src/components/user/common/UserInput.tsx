import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

interface Type {
    name: string | any;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    onBlur: React.ChangeEventHandler<HTMLInputElement>;
    ref: any;
}
interface IProps {
    type: string;
    placeholder: string;
    errors: any;
    register: Type;
}

export default function UserInput({ type, placeholder, errors, register }: IProps) {
    const [errorType, setErrorType] = useState<string>('');

    useEffect(() => {
        if (errors) {
            switch (type) {
                case (type = 'email'):
                    setErrorType('이메일');
                    break;
                case (type = 'password'):
                    setErrorType('패스워드');
                    break;
                case (type = 'text'):
                    setErrorType('이름');
                    break;
                    return;
            }
        }
    }, [errors]);

    return (
        <FormInputBox>
            <input
                {...register}
                className={errors ? 'text_input active' : 'text_input'}
                type={type}
                placeholder={placeholder}
                autoComplete={register.name === 'password' ? 'on' : 'off'}
            />
            {errors && errors?.type === 'required' && <p className="error">{errorType}을 입력해주세요.</p>}
            {errors && errors?.type === 'maxLength' && <p className="error">64자 이상 입력할 수 없습니다.</p>}
            {errors && errors?.type === 'minLength' && <p className="error">4자 이하로 입력할 수 없습니다.</p>}
            {errors && errors?.type === 'validate' && <p className="error">패스워드가 일치하지 않습니다.</p>}
        </FormInputBox>
    );
}

const FormInputBox = styled.div`
    width: 100%;
    position: relative;
    margin-bottom: 15px;
    text-align: center;
    :last-of-type {
        margin-bottom: 0;
    }

    .text_input {
        box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
        box-sizing: border-box;
        display: inline-block;
        outline: none;
        border: none;
        width: 100%;
        height: 70px;
        padding: 0 20px;
        background-color: #e3e1e1;
        border-radius: 10px;
        font-family: 'Spoqa Han Sans', 'sans-serif';
        font-size: 18px;

        ::placeholder {
            color: #a2a2a2;
        }
    }
    .text_input:focus-within {
        border: 3px solid #2c2c4d;
    }

    .text_input.active:focus-within {
        border: 3px solid #ff4c4c;
    }

    .error {
        color: #ff4c4c;
        font-size: 11px;
        position: absolute;
        left: 20px;
        bottom: 5px;
    }
`;
