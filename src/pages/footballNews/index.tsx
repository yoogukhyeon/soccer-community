import React, { useEffect, useState } from 'react';
import MetaTag from '../../constants/SEOMetaTag';
import { useParams } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import NewsNav from '@/components/news/NewsNav';
function Board() {
    const { category = '' } = useParams<string | ''>();

    return (
        <>
            <MetaTag title="게시판" description="게시판 목록" />
            <NewsNav category={category} />
        </>
    );
}

export default Board;
