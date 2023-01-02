import React, { useEffect, useState } from 'react';
import BoardNav from '../../components/board/BoardNav';
import MetaTag from '../../constants/SEOMetaTag';
import { useParams } from 'react-router-dom';
import BoardList from '@/components/board/BoardList';
import { useBoardQuery } from '@/api/board';

interface IList {
    readonly category: string;
    readonly commentCount: number;
    readonly diffDate: string;
    readonly id: number;
    readonly likes: number;
    readonly title: string;
    readonly views: number;
}

function Board() {
    const { category = '' } = useParams<string | ''>();

    //useQuery list
    const { data, status } = useBoardQuery();

    return (
        <>
            <MetaTag title="게시판" description="게시판 목록" />
            <BoardNav category={category} />
            <BoardList lists={data} status={status} />
        </>
    );
}

export default Board;
