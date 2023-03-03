import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

interface Lists {
    no: number;
    categoryName: string;
}
interface IProps {
    readonly category: string;
    readonly lists: Lists[];
}

export default function CategoryNav({ category, lists }: IProps) {
    return (
        <CategoryWrap>
            <li className={category === '' ? 'active' : ''}>
                <Link to="/football-news">전체 메뉴</Link>
            </li>
            {lists?.length > 0 &&
                lists.map((val) => (
                    <li key={val.no} className={category === String(val.no) ? 'active' : ''}>
                        <Link to={`/football-news/${String(val.no)}`}>{val.categoryName}</Link>
                    </li>
                ))}
        </CategoryWrap>
    );
}

const CategoryWrap = styled.ul`
    padding: 30px 0;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 20px;

    li {
        position: relative;
        font-weight: bold;
        color: #010110;
        line-height: 1.3;
        overflow: visible;
        transition: all 0.3s ease-in-out;
    }

    li.active {
        color: #ff4c0e;

        a:after {
            content: '';
            display: block;
            position: absolute;
            top: 0;
            right: -0.1px;
            width: 4px;
            height: 4px;
            background: #ff4c0e;
            border-radius: 50%;
            transform: translate3d(100%, -100%, 0);
        }
    }

    @media screen and (max-width: 768px) {
        & {
            padding: 25px 0;
        }

        a {
            font-size: 14px;
        }
    }
`;
