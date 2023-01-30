import React, { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import Form from '@/components/board/common/Form';
import { useBoardDetailQuery } from '@/api/board';
import WriteNav from '@/components/board/common/WriteNav';

export default function Create() {
    const { id } = useParams();
    const { data, status } = useBoardDetailQuery(Number(id));

    return (
        <>
            <WriteNav isUpdate={true} />
            {data && <Form isUpdate={true} view={data} />}
        </>
    );
}
