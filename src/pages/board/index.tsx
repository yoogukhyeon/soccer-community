import React, { useEffect, useState } from 'react';
import BoardNav from '../../components/board/BoardNav';
import MetaTag from '../../constants/SEOMetaTag';
import { useParams } from 'react-router-dom';
import BoardList from '@/components/board/BoardList';
import { useBoardQuery } from '@/api/board';

function Board() {
    const { category = '' } = useParams<string | ''>();

    //useQuery list
    const { data, status, refetch } = useBoardQuery(category);

    useEffect(() => {
        refetch();
    }, [category]);
    return (
        <>
            <MetaTag title="게시판" description="게시판 목록" />
            <BoardNav category={category} />
            <BoardList lists={data} status={status} />
        </>
    );
}

export default Board;
