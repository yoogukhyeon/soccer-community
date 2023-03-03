import React, { useEffect, useState } from 'react';
import MetaTag from '../../constants/SEOMetaTag';
import { useParams } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import BoardList from '@/components/board/BoardList';
import NewsNav from '@/components/news/NewsNav';
import { useNewsQuery } from '@/api/news';
function Board() {
    const [startNum, setStartNum] = useState<number>(0);
    const [endNum, setEndNum] = useState<number>(5);
    const { category = '' } = useParams<string | ''>();
    const { data, status, refetch } = useNewsQuery(category, startNum, endNum);

    useEffect(() => {
        refetch();
    }, [data]);

    return (
        <>
            <MetaTag title="게시판" description="게시판 목록" />
            <NewsNav category={category} />
            <BoardList lists={data?.newsList} status={status} type="news" />
        </>
    );
}

export default Board;
