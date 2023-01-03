import React, { ChangeEvent, Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import Select, { ActionMeta } from 'react-select';
import FroalaEditor from '@/components/common/FroalaEditor';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useBoardMutation } from '@/api/board';
import Loading from '../../common/Loading';
import { IView } from '@/types/board';
interface IOption {
    readonly value: string;
    readonly label: string;
}

const option: IOption[] = [
    { value: 'notice', label: '공지' },
    { value: 'free', label: '자유' },
    { value: 'sports', label: '스포츠' },
];

interface IInput {
    title: string;
    content: string;
    category: string;
}

interface Config {
    method: string;
    type: string;
    url: string;
    data: any;
}

/* interface IProps {
    onChangeInput: (e: ChangeEvent<HTMLInputElement>) => void;
    inputs: Input;
    handleModelInput: (content: string) => void;
    setEditorInput: Dispatch<SetStateAction<string>>;
}  */

interface IProps {
    readonly isUpdate?: boolean | any;
    readonly view?: IView;
}

export default function Form({ isUpdate, view }: IProps) {
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
        //랜덤 수
        const random1 = Math.floor(Math.random() * 100);
        const random2 = Math.floor(Math.random() * 100);
        const random3 = Math.floor(Math.random() * 100);

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
            views: random1,
            likes: random2,
            diffDate: '1분전',
            commentCount: random3,
        };

        let updateData: IView | any;
        if (isUpdate) {
            const id = view?.id;
            updateData = { ...data, id };
        }

        boardMutate(isUpdate ? updateData : data, {
            onSuccess: (res) => {
                if (res.status === 201 || res.status === 200) {
                    alert('글 작성을 완료했습니다.');
                    navigate(`/boards/detail/${res.data.id}`);
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
            const category = option.find((list) => list.value === view.category);
            setSelected(category);
            setInputs({
                ...inputs,
                title: view.title,
                content: view.content,
                category: view.category,
            });
        }
    }, [view]);

    return (
        <>
            <form onSubmit={(e) => e.preventDefault()}>
                <TitleBox>
                    <div className="select_wrap">
                        <Cselect
                            isClearable={true}
                            isSearchable={false}
                            placeholder="선택"
                            options={option}
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
                        {isLoading ? <Loading size="sm" /> : isUpdate ? '수정' : '등록'}
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
            height: 40px;
            font-size: 16px;
        }
    }
`;

const EditorWrap = styled.div`
    min-height: 450px;
    margin: 20px 0 40px 0;
`;
