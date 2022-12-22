import React from 'react';
import styled from 'styled-components';

export default function NotFound() {
    return (
        <NotFoundWrap>
            <h1 className="text">Not Found</h1>
            <p className="text">
                페이지를 찾을수 없습니다.
                <br />
                해당 사이트 관리자에게 문의바랍니다.
            </p>
        </NotFoundWrap>
    );
}

const NotFoundWrap = styled.div`
    width: 100%;
    height: 100%;
    padding: 15px 0;
    .text {
        font-size: 20px;
        line-height: 28px;
    }

    @media screen and (max-width: 768px) {
        .text {
            font-size: 14px;
            line-height: 21px;
        }
    }
`;
