import Form from '@/components/board/common/Form';
import WriteNav from '@/components/board/common/WriteNav';
import { useLocation } from 'react-router-dom';

export default function Create() {
    const { state } = useLocation();

    return (
        <>
            <WriteNav />
            <Form />
        </>
    );
}
