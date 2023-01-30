import { useBoardDetailQuery } from '@/api/board';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { CgChevronLeft } from 'react-icons/cg';
import Loading from '@/components/common/Loading';
import BoardView from '@/components/board/BoardView';
import { useNavigate } from 'react-router-dom';

export default function index() {
    const { id } = useParams();
    const { data, status } = useBoardDetailQuery(Number(id));

    const navigate = useNavigate();
    const goToBack = () => navigate('/boards');

    return (
        <>
            <GoToBtn onClick={goToBack}>
                <i>
                    <CgChevronLeft />
                </i>
                <span>목록으로 가기</span>
            </GoToBtn>
            {status === 'loading' && <Loading />}
            {status === 'error' && <div>Server Error...</div>}
            {data && <BoardView view={data} />}
        </>
    );
}

const GoToBtn = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    cursor: pointer;
    color: #6a6a82;
    margin: 30px 0 20px;

    i {
        font-size: 18px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    span {
        font-size: 16px;
    }
`;
