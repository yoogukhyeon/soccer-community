import { useBoardDetailQuery } from '@/api/board';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Loading from '@/components/common/Loading';
import BoardView from '@/components/board/BoardView';

export default function index() {
    const { id } = useParams();
    const { data, status } = useBoardDetailQuery(Number(id));

    return (
        <>
            {status === 'loading' && <Loading />}
            {status === 'error' && <div>Server Error...</div>}
            {data && <BoardView view={data} />}
        </>
    );
}
