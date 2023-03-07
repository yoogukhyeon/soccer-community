import React, { useEffect, useState } from 'react';
import BoardNav from '../../components/board/BoardNav';
import MetaTag from '../../constants/SEOMetaTag';
import { useParams } from 'react-router-dom';
import BoardList from '@/components/board/BoardList';
import { useBoardQuery } from '@/api/board';
import Pagination from '@/components/board/common/Pagination';
import { useSearchParams } from 'react-router-dom';
function Board() {
    const [searchParams] = useSearchParams();
    const page = Number(searchParams.get('page') || 1);
    const startNum = Number(searchParams.get('startNum') || 0);
    const endNum = Number(searchParams.get('endNum') || 5);
    const [pageTotal, setPageTotal] = useState<number>(1);
    const [start, _] = useState<number>(0);
    const { category = '' } = useParams<string | ''>();

    //useQuery list
    const { data, status, refetch } = useBoardQuery(category, startNum, endNum);

    useEffect(() => {
        refetch();
    }, [category, page, startNum]);

    useEffect(() => {
        refetch();
        setPageTotal(1);
        data?.boardTotal && setPageTotal(Math.ceil(Number(data?.boardTotal) / endNum));
    }, [data]);

    return (
        <>
            <MetaTag title="게시판" description="게시판 목록" />
            <BoardNav category={category} />
            <BoardList lists={data?.boardList} status={status} />
            <Pagination
                total={data?.boardTotal}
                category={category}
                pageTotal={pageTotal}
                page={page}
                start={start}
                end={endNum}
            />
        </>
    );
}

export default Board;
