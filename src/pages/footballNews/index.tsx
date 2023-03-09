import React, { useEffect, useState } from 'react';
import MetaTag from '../../constants/SEOMetaTag';
import { useParams } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import BoardList from '@/components/board/BoardList';
import NewsNav from '@/components/news/NewsNav';
import { useNewsQuery } from '@/api/news';
import Pagination from '@/components/board/common/Pagination';
function Board() {
    const [searchParams] = useSearchParams();
    const page = Number(searchParams.get('page') || 1);
    const startNum = Number(searchParams.get('startNum') || 0);
    const endNum = Number(searchParams.get('endNum') || 5);
    const [pageTotal, setPageTotal] = useState<number>(1);
    const [start, _] = useState<number>(0);
    const { category = '' } = useParams<string | ''>();
    const { data, status, refetch } = useNewsQuery(category, startNum, endNum);

    useEffect(() => {
        refetch();
    }, [category, page, startNum]);

    useEffect(() => {
        data?.newsTotal && setPageTotal(Math.ceil(Number(data?.newsTotal) / endNum));
    }, [data]);

    return (
        <>
            <MetaTag title="뉴스소식" description="뉴스소식 목록" />
            <NewsNav category={category} />
            <BoardList lists={data?.newsList} status={status} type="news" />
            <Pagination
                total={data?.boardTotal}
                category={category}
                pageTotal={pageTotal}
                page={page}
                start={start}
                end={endNum}
                path="news"
            />
        </>
    );
}

export default Board;
