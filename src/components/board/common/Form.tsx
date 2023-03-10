import React, { ChangeEvent, Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import Select, { ActionMeta } from 'react-select';
import FroalaEditor from '@/components/common/FroalaEditor';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { useBoardMutation } from '@/api/board';
import Loading from '../../common/Loading';
import { IView } from '@/types/board';
import { useQueryClient } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import authAtom from '@/stores/authAtom';
import { usePreventLeave } from '@/hooks/usePreventLeave';
import { preventGoBack } from '@/hooks/useGoBack';

interface IOption {
    readonly value: string;
    readonly label: string;
}

const option: IOption[] = [
    { value: 'notice', label: '공지' },
    { value: 'free', label: '자유' },
    { value: 'fun', label: '유머' },
    { value: 'sports', label: '스포츠' },
];

const subOption: IOption[] = [
    { value: 'free', label: '자유' },
    { value: 'fun', label: '유머' },
    { value: 'sports', label: '스포츠' },
];

interface IInput {
    title: string;
    content: string;
    category?: string;
}

interface Config {
    method: string;
    type: string;
    url: string;
    data: any;
}

interface IProps {
    readonly isUpdate?: boolean | any;
    readonly view?: IView;
}

export default function Form({ isUpdate, view }: IProps) {
    const [auth] = useAtom(authAtom);
    const id = auth?.user?.id;
    const queryClient = useQueryClient();
    const { state } = useLocation();
    const { mutate: boardMutate, isLoading } = useBoardMutation(isUpdate);
    const navigate = useNavigate();

    const selectedRef: any = useRef(null);
    const titleRef: any = useRef(null);

    const [selected, setSelected] = useState<IOption | null | any>();
    const [inputs, setInputs] = useState<IInput>(() => {
        return {
            title: '',
            content: '',
            category: '',
        };
    });

    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInputs({ ...inputs, [name]: value });
    };

    const onChangeSelect = (newValue: IOption | any, actionMeta: ActionMeta<unknown> | any) => {
        const { name } = actionMeta;
        setSelected(newValue);
        setInputs({ ...inputs, [name]: '' });

        if (newValue) {
            const { value } = newValue;

            setInputs({ ...inputs, [name]: value });
        }
    };

    //froala 글자수 예외처리
    const [editorInput, setEditorInput] = useState('');
    // editor
    const handleModelInput = (content: string) => {
        setInputs({ ...inputs, ['content']: content });
    };

    // 데이터 submit
    const handleSubmit = async () => {
        if (inputs.category === '') {
            alert('카테고리를 선택해주세요.');
            return selectedRef.current.focus();
        }

        if (inputs.title === '') {
            alert('제목을 입력해주세요.');
            return titleRef.current.focus();
        }

        if (inputs.content === '') {
            return alert('내용을 입력해주세요.');
        }

        const data = {
            ...inputs,
            id,
        };

        let updateData: IView | any;
        if (isUpdate) {
            const no = view?.no;
            updateData = { ...data, no, id };
        }

        boardMutate(isUpdate ? updateData : data, {
            onSuccess: (res) => {
                if (res.status === 201 || res.status === 200) {
                    if (!isUpdate) {
                        alert('글 작성을 완료했습니다.');
                        queryClient.invalidateQueries(['boardList', res.data.data.no]);
                        navigate(`/boards/detail/${res.data.data.no}`);
                    } else {
                        alert('글 수정을 완료했습니다.');
                        queryClient.invalidateQueries(['boardList', updateData.no]);
                        navigate(`/boards/detail/${updateData.no}`);
                    }
                }
            },
            onError: (err) => {
                console.log('err', err);
                console.error(err);
            },
        });
    };

    useEffect(() => {
        if (view) {
            const category = option.find((list) => list.label === view.category);
            setSelected(category);

            setInputs({
                ...inputs,
                title: view.title,
                content: view.content,
                category: category?.value,
            });
        }
    }, [view]);

    // 브라우저에 렌더링 시 한 번만 실행하는 코드
    const { pushGoBack, addGoBackPrevent, removeGoBackPrevent } = preventGoBack(state);
    //새로고침 즉시 실행
    useEffect(() => {
        const { enablePrevent, disablePrevent } = usePreventLeave();

        (() => {
            //브라우저 새로고침 방지
            enablePrevent();
            //브라우저 뒤로가기 방지
            pushGoBack();
            addGoBackPrevent();
        })();

        return () => {
            //브라우저 새로고침 방지
            disablePrevent();
            //브라우저 뒤로가기 방지
            removeGoBackPrevent();
        };
    }, []);

    return (
        <>
            <form onSubmit={(e) => e.preventDefault()}>
                <TitleBox>
                    <div className="select_wrap">
                        <Cselect
                            isClearable={true}
                            isSearchable={false}
                            placeholder="선택"
                            options={auth?.user?.manage === 'Y' ? option : subOption}
                            value={selected}
                            onChange={onChangeSelect}
                            autoFocus
                            defaultValue={selected}
                            name="category"
                            ref={selectedRef}
                        />
                    </div>
                    <Input
                        type="text"
                        placeholder="제목을 입력해주세요."
                        value={inputs.title}
                        onChange={onChangeInput}
                        name="title"
                        ref={titleRef}
                    />
                </TitleBox>
                <EditorWrap>
                    <FroalaEditor inputs={inputs} handleModelInput={handleModelInput} setEditorInput={setEditorInput} />
                </EditorWrap>

                <SubmitBtnBox>
                    <button type="button" onClick={handleSubmit} className="btn_submit">
                        {isLoading ? <Loading size="sm" type="board" /> : isUpdate ? '수정' : '등록'}
                    </button>
                </SubmitBtnBox>
            </form>
        </>
    );
}

const Cselect = styled(Select)`
    width: 100%;
    color: #6a6a82;
    position: relative;
    z-index: 999;

    > div:nth-child(3) {
        height: 52px;
    }

    .css-1jqq78o-placeholder {
        font-weight: 500;
        color: #6a6a82;
        opacity: 0.7;
        font-size: 14px;
    }

    @media screen and (max-width: 768px) {
        > div:nth-child(3) {
            height: 42px;
        }

        .css-1jqq78o-placeholder {
            font-size: 12px;
        }

        .css-1dimb5e-singleValue {
            font-size: 14px;
        }

        .css-1xc3v61-indicatorContainer {
            padding: 0px !important;
        }

        .css-15lsz6c-indicatorContainer {
            padding: 0px !important;
        }
    }
`;

const TitleBox = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 10px;

    .select_wrap {
        min-width: 105px;
        width: 20%;
    }
`;

const Input = styled.input`
    width: 80%;
    height: 50px;
    padding: 0 7px;
    color: #6a6a82;
    border: 1px solid #d3d3e4;
    outline: none;
    border-radius: 2px;

    ::placeholder {
        font-weight: 500;
        color: #6a6a82;
        opacity: 0.7;
        font-size: 14px;
    }

    @media screen and (max-width: 768px) {
        & {
            height: 40px;
        }

        ::placeholder {
            font-size: 12px;
        }
    }
`;

const SubmitBtnBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 30px 0;

    .btn_submit {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50%;
        height: 55px;
        border-radius: 10px;
        background-color: #ff4c0e;
        color: #ffffff;
        font-size: 18px;
        font-weight: bold;
        border: none;
        cursor: pointer;
    }

    @media screen and (max-width: 768px) {
        .btn_submit {
            width: 100%;
            height: 50px;
            font-size: 16px;
        }
    }
`;

const EditorWrap = styled.div`
    min-height: 450px;
    margin: 20px 0 40px 0;

    .fr-wrapper {
        > div {
            > a {
                display: none !important;
            }
        }
    }
`;
