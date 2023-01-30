/* plugins */
import Editor from 'react-froala-wysiwyg';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/js/plugins.pkgd.min.js';

import { Dispatch, useState } from 'react';

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
            input: function (this: any, inputEvent: any) {
                const innerText = inputEvent?.target?.innerText;
                setEditorInput && setEditorInput(innerText);
                if (innerText.length > 2000) {
                    return alert('2000자까지 입력 가능합니다');
                }
                return false;
            },
        },
        ...option,
    };

    return <Editor config={config} tag="textarea" model={inputs.content} onModelChange={handleModelInput} />;
}
