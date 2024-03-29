import React, { ChangeEvent, useState } from 'react';
import { useParams } from 'react-router-dom';
import Form from '@/components/board/common/Form';
import { useBoardDetailQuery } from '@/api/board';
import WriteNav from '@/components/board/common/WriteNav';

export default function Update() {
    const { id } = useParams();
    const { data, status } = useBoardDetailQuery(Number(id));

    return (
        <>
            <WriteNav isUpdate={true} />
            {data && <Form isUpdate={true} view={data} />}
        </>
    );
}
