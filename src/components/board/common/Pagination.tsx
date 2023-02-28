import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { CgChevronRight, CgChevronLeft } from 'react-icons/cg';
import { useNavigate } from 'react-router-dom';
import { useBoardPreFetchQuery } from '@/api/board';
interface IProps {
    total: string;
    page: number;
    pageTotal: number;
    category: string;
    start: number;
    end: number;
}

export default function Pagination({ total, pageTotal, category, page, start, end }: IProps) {
    const navigate = useNavigate();
    const [totalPageList, setTotalPageList] = useState<any[]>([1]);

    const [next, setNext] = useState<boolean>(false);
    const [prev, setPrev] = useState<boolean>(false);

    useEffect(() => {
        setTotalPageList(
            Array.from({ length: pageTotal > 10 ? 10 : pageTotal }, (_: any, i: any) =>
                page < 10 ? i + 1 : i + page - 9,
            ),
        );

        setPrev(page > 1 ? true : false);
        setNext(page !== pageTotal ? true : false);
    }, [total, pageTotal]);

    useEffect(() => {
        setPrev(page > 1 ? true : false);
        setNext(page !== pageTotal ? true : false);
    }, [page]);

    const goToPage = (page: number) => {
        page = page >= totalPageList.length ? totalPageList.length : page;
        start = (page - 1) * end;
        category = category && `/${category}`;
        navigate(`/boards${category}?page=${page}&startNum=${start}&endNum=${end}`);
    };

    const goToPrevAndNext = (type: boolean) => {
        category = category && `/${category}`;
        if (type) {
            page = page < 1 ? 1 : page - 1;
            start = (page - 1) * end;
            prev && navigate(`/boards${category}?page=${page}&startNum=${start}&endNum=${end}`);
        } else {
            page = page >= totalPageList.length ? totalPageList.length : page + 1;
            start = (page - 1) * end;
            next && navigate(`/boards${category}?page=${page}&startNum=${start}&endNum=${end}`);
        }
    };

    useEffect(() => {
        start = page * end;
        useBoardPreFetchQuery(category, start, end);
    }, [page]);

    return (
        <PaginationWrap>
            <div className="pagination">
                <i className={prev ? 'active' : ''} onClick={() => goToPrevAndNext(true)}>
                    <CgChevronLeft />
                </i>
                <ul>
                    {totalPageList?.map((num) => (
                        <li key={num} className={page === num ? 'active' : ''} onClick={() => goToPage(num)}>
                            {num}
                        </li>
                    ))}
                </ul>
                <i className={next ? 'active' : ''} onClick={() => goToPrevAndNext(false)}>
                    <CgChevronRight />
                </i>
            </div>
        </PaginationWrap>
    );
}

const PaginationWrap = styled.div`
    max-width: 80%;
    margin: 60px auto 60px;
    @media screen and (max-width: 768px) {
        max-width: 100%;
    }

    .pagination {
        display: flex;
        justify-content: space-between;
        align-items: center;

        i {
            font-size: 30px;
            cursor: pointer;
            color: #d6d6d6;
        }

        i.active {
            cursor: pointer;
            color: #000000;
        }

        ul {
            display: flex;
            align-items: center;
            gap: 15px;

            li {
                font-size: 24px;
                color: #d6d6d6;
                cursor: pointer;
            }

            li.active {
                font-size: 24px;
                color: #000000;
                font-weight: 600;
            }
        }
    }
`;
