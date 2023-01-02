import { useBoardDetailQuery } from '@/api/board';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function index() {
    const { id } = useParams();
    const { data, status } = useBoardDetailQuery(Number(id));

    return (
        <div>
            <h1>detail</h1>
        </div>
    );
}
