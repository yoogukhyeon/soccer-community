import React, { useState } from 'react';
import styled from 'styled-components';
import { CgCheck } from 'react-icons/cg';
import MetaTag from '@/constants/SEOMetaTag';
import { useForm, Resolver } from 'react-hook-form';
import UserInput from '@/components/user/common/UserInput';
import { useNavigate, useLocation } from 'react-router-dom';
import { useHistoryMutation, useSignInMutation } from '@/api/user';
import Cookies from 'universal-cookie';

interface FormValues {
    email: string;
    password: string;
}

export default function SignIn() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const [errorMsg, setErrorMsg] = useState<any>('');
    const { mutate: userMutate, isLoading } = useSignInMutation();
    const { mutate: userHistoryMutate } = useHistoryMutation();
    const goToSignUp = () => {
        navigate('/user/sign-up');
    };
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>({});

    const onSubmit = (data: FormValues) => {
        userMutate(data, {
            onSuccess: (res) => {
                if (res.data.message === 'success') {
                    const cookies = new Cookies();
                    const accessToken = res.data.data.accessToken;
                    const refreshToken = res.data.data.refreshToken;
                    const id = res.data.data.id;

                    cookies.set('access_token', accessToken, {
                        secure: true,
                        maxAge: 1000 * 60 * 60 * 24 * 7,
                        path: '/',
                    });

                    cookies.set('refresh_token', refreshToken, {
                        secure: true,
                        maxAge: 1000 * 60 * 60 * 24 * 7,
                        path: '/',
                    });

                    const history = {
                        id,
                        token: refreshToken,
                    };
                    // 사용자 히스토리 내역 저장
                    userHistoryMutate(history);

                    if (state) {
                        navigate(state);
                    } else {
                        navigate('/');
                    }
                }
            },
            onError: (err: any) => {
                console.log('err', err);
                console.error(err);
                setErrorMsg(() => err?.response?.data);
            },
        });
    };

    return (
        <>
            <MetaTag title="SignIn" description="로그인 페이지"></MetaTag>
            <SignInWrap>
                <FormWrap onSubmit={handleSubmit(onSubmit)}>
                    <div className="sign_in_title">
                        <h2>로그인</h2>
                    </div>
                    <UserInput
                        register={{ ...register('email', { required: true, maxLength: 64 }) }}
                        type="email"
                        placeholder="이메일을 입력해주세요."
                        errors={errors?.email}
                    />

                    <UserInput
                        register={{
                            ...register('password', {
                                required: true,
                                minLength: 4,
                                maxLength: 64,
                            }),
                        }}
                        type="password"
                        placeholder="패스워드를 입력해주세요."
                        errors={errors?.password}
                    />
                    {errorMsg && <p className="login_error">{errorMsg?.message}</p>}

                    <FormOptionBox>
                        <span>아이디</span>
                        <span>비밀번호</span>
                        <span>찾기</span>
                    </FormOptionBox>

                    <button type="submit" className="login_btn">
                        로그인
                    </button>
                </FormWrap>
                <SignUpWrap>
                    <div className="divide_line">
                        <span></span>
                        <p>or</p>
                    </div>
                    <a href="#" className="sign_up_btn" onClick={goToSignUp}>
                        회원가입
                    </a>
                </SignUpWrap>
            </SignInWrap>
        </>
    );
}

const SignInWrap = styled.div`
    max-width: 400px;
    margin: 80px auto 30px;
`;

const FormWrap = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;

    > .sign_in_title {
        text-align: center;
        font-size: 24px;
        font-weight: 600;
        margin-bottom: 30px;
    }

    .login_btn {
        display: block;
        width: 100%;
        height: 70px;
        border-radius: 10px;
        font-family: 'Spoqa Han Sans', 'sans-serif';
        outline: none;
        border: none;
        -webkit-appearance: none;
        -ms-appearance: none;
        -o-appearance: none;
        -moz-appearance: none;
        cursor: pointer;
        background-color: #ff4c0e;
        color: #ffffff;
        font-weight: 500;
        font-size: 20px;
    }

    .login_error {
        width: 100%;
        margin-top: 10px;
        text-align: left;
        color: #ff4c4c;
    }

    @media screen and (max-width: 768px) {
        > .sign_in_title {
            font-size: 20px;
            margin-bottom: 25px;
        }

        .login_btn {
            height: 55px;
            font-size: 15px;
        }
    }
`;

const FormOptionBox = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    font-size: 16px;
    margin: 20px 0;
    width: 100%;

    span {
        position: relative;
        color: #373d41;
        cursor: pointer;
    }

    span + span {
        margin-left: 10px;
    }
    span:first-child::after {
        position: absolute;
        top: 50%;
        right: -7px;
        content: '';
        display: block;
        width: 1px;
        height: 100%;
        transform: translateY(-43%);
        background: #707070;
    }

    @media screen and (max-width: 768px) {
        & {
            font-size: 14px;
            margin: 15px 0;
        }
    }
`;

const SignUpWrap = styled.div`
    .divide_line {
        position: relative;
        margin: 30px 0;
        text-align: center;

        span {
            position: absolute;
            top: 50%;
            left: 0;
            display: block;
            width: 100%;
            height: 1px;
            background: #000000;
            transform: translateY(-50%);
        }

        p {
            display: inline-block;
            z-index: 2;
            position: relative;
            padding: 5px;
            font-size: 16px;
            background: #ffffff;
            border-radius: 50%;

            vertical-align: middle;
        }
    }

    .sign_up_btn {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 70px;
        border-radius: 10px;
        font-family: 'Spoqa Han Sans', 'sans-serif';
        -webkit-appearance: none;
        -ms-appearance: none;
        -o-appearance: none;
        -moz-appearance: none;
        cursor: pointer;
        background-color: #ffffff;
        color: #000000;
        font-weight: 500;
        font-size: 20px;
        text-align: center;
        border: 2px solid #ff4c0e;
        vertical-align: middle;
    }

    @media screen and (max-width: 768px) {
        .sign_up_btn {
            height: 55px;
            font-size: 15px;
        }
    }
`;
