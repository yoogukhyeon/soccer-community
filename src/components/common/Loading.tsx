import React from 'react';
import styled from 'styled-components';

interface IProps {
    readonly size?: string;
    readonly type?: string;
}

export default function Loading({ size, type }: IProps) {
    return (
        <LoadingWrap size={size} type={type}>
            <div className="Loading">
                <span className="loading_circle"></span>
            </div>
        </LoadingWrap>
    );
}

const LoadingWrap = styled.div<IProps>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    opacity: 1;
    transition: 0.5s;
  
    .Loading {
        position: relative;
        width: ${(props) => (props.size === 'sm' ? '40px' : '70px')};
        height: ${(props) => (props.size === 'sm' ? '40px' : '70px')};

        .loading_circle {
            display: block;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            animation: loading-spin 2s infinite;
            border: ${(props) => (props.size === 'sm' ? '6px' : '8px')} solid rgba(207, 197, 197, 0.4);
            border-top: ${(props) => (props.size === 'sm' ? '6px' : '8px')} solid ${(props) => (props.type === 'board' ? 'white' : 'black')};
        }
    }

    @media screen and (max-width: 768px) {
        & {
           
            .Loading {
                width: ${(props) => (props.size === 'sm' ? '35px' : '50px')};
                height: ${(props) => (props.size === 'sm' ? '35px' : '50px')};

                .loading_circle {
                    border: ${(props) => (props.size === 'sm' ? '4px' : '6px')} solid rgba(207, 197, 197, 0.4);
                    border-top: ${(props) => (props.size === 'sm' ? '4px' : '6px')} solid
                        ${(props) => (props.size === 'sm' ? 'white' : 'black')};
                }
            }
        }
    }

    @keyframes loading-spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;
