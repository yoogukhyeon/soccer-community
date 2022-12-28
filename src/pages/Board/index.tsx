import React, { useEffect, useState } from 'react';
import BoardNav from '../../components/board/BoardNav';
import MetaTag from '../../constants/SEOMetaTag';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Board() {
    const { category = '' } = useParams();

    const [data, setData] = useState<any[]>([]);

    async function AxiosCall() {
        const res = await axios({
            method: 'GET',
            url: 'http://localhost:8080/boards',
        });
        console.log('2000?>', res);
        setData(res.data);
    }

    useEffect(() => {
        AxiosCall();
    }, []);
    console.log('setData++', data);
    return (
        <>
            <MetaTag title="게시판" description="게시판 목록" />
            <BoardNav category={category} />
            <ul>
                {data
                    ?.sort((a: any, b: any) => b.id - a.id)
                    .map((list, idx) => {
                        console.log('list', list);
                        console.log('idx', idx);
                        return (
                            <li key={list.id}>
                                <h1>{list.title}</h1>
                                <h2>{list.category}</h2>
                                <br />
                                <br />
                                <hr />
                            </li>
                        );
                    })}
            </ul>
        </>
    );
}

export default Board;
