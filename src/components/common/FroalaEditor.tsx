/* plugins */
import Editor from 'react-froala-wysiwyg';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/js/plugins.pkgd.min.js';
import { Dispatch, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
interface IFrolaEditorProps {
    inputs: { content: string };
    option?: any;
    handleModelInput: (content: string) => void;
    setEditorInput?: Dispatch<React.SetStateAction<string>>;
}

export default function FroalaEditor({ inputs, option, handleModelInput, setEditorInput }: IFrolaEditorProps) {
    const config = {
        placeholderText: '내용을 입력하세요(10자 이상)',
        key: 'AVB8B-21C2E3A2F3A2C1uldC-16yzD5sxvvfxE-13tkG2ytqaD6C4D3E3G3E2G1C9D4C3==',
        language: 'ko',
        attribution: false,
        imageDefaultWidth: 540,
        heightMin: 400,
        heightMax: 400,
        theme: 'gray',
        toolbarStickyOffset: 0,
        pluginsEnabled: null,
        charCounterMax: 2000,
        imageMaxSize: 20 * 1024 * 1024,
        imageAllowedTypes: ['jpeg', 'jpg', 'png', 'gif'], // 이미지 허용
        quickInsertEnabled: false,
        toolbarButtons: {
            moreText: {
                buttons: [
                    'bold',
                    'italic',
                    'underline',
                    'fontSize',
                    'textColor',
                    '|',
                    'alert' /*  'clearFormatting' */,
                ],
                buttonsVisible: 5,
            },
            moreRich: {
                buttons: ['insertLink', 'insertImage'],
                buttonsVisible: 2,
            },
        },
        toolbarButtonsXS: {
            moreText: {
                buttons: ['bold', 'italic', 'underline', 'fontSize', 'textColor' /* 'clearFormatting' */],
                buttonsVisible: 5,
            },
            moreRich: {
                buttons: ['insertImage', 'insertLink'],
                buttonsVisible: 2,
            },
        },
        imageEditButtons: ['imageAlign', 'imageSize', 'imageRemove'],
        events: {
            'image.beforeUpload': async function (this: any, images: any) {
                try {
                    let file = images[0];

                    // url 입력 시 file 형태로 변환
                    if (!(file instanceof File)) {
                        const blobToFile = new File([file], `link_file.${file.type.split('/')[1]}`, {
                            type: file.type,
                        });
                        file = blobToFile;
                    }

                    const formData = new FormData();
                    formData.append('img', file);

                    await axios
                        .post(`${process.env.REACT_APP_API_URL}/api/file`, formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                                Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
                            },
                        })
                        .then((res) => {
                            if (res.data.message === 'success') {
                                const link = res.data.link;
                                this.image.insert(link, null, null, this.image.get());
                            }
                        })
                        .catch(() => {
                            alert('이미지를 업로드 할 수 없습니다.');
                            return;
                        });
                } catch (err) {
                    alert('이미지 업로드 실패. 관리자에게 문의 바랍니다.');
                    console.log('Error', err);
                    throw err;
                }
            },
            input: function (this: any, inputEvent: any) {
                const innerText = inputEvent?.target?.innerText;
                setEditorInput && setEditorInput(innerText);
                if (innerText.length > 2000) {
                    return alert('2000자까지 입력 가능합니다');
                }
                return false;
            },
            'charCounter.exceeded': function () {
                return alert('2000자까지 입력 가능합니다');
            },
        },
        ...option,
    };

    return <Editor config={config} tag="textarea" model={inputs.content} onModelChange={handleModelInput} />;
}
