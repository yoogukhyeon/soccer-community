import React, { ChangeEvent, useState } from 'react';
import { useParams } from 'react-router-dom';
import Form from '@/components/news/common/Form';
import WriteNav from '@/components/board/common/WriteNav';
import { useNewsDetailQuery } from '@/api/news';

export default function Update() {
    const { id } = useParams();
    const { data, status } = useNewsDetailQuery(Number(id));

    return (
        <>
            <WriteNav isUpdate={true} type="news" />
            {data && <Form isUpdate={true} view={data} />}
        </>
    );
}
