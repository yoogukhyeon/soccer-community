import CategoryNav from './common/CategoryNav';
import { Button } from '../common/Button';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

interface IProps {
    category: string;
}

export default function BoardNav({ category }: IProps) {
    const navigate = useNavigate();

    const goToWrite = () => {
        // navigate('/boards/create', { state: url });
    };
    return (
        <>
            <Wrap>
                <CategoryNav category={category} />
                <BtnWrap>
                    <Button onClick={goToWrite} text="글 작성하기" />
                </BtnWrap>
            </Wrap>
        </>
    );
}

const Wrap = styled.div`
    width: 100%;
    position: relative;
`;

const BtnWrap = styled.div`
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);

    @media screen and (max-width: 768px) {
        & {
            position: fixed;
            top: 80%;
            right: 6%;
            transform: none;
            z-index: 9999;
        }
    }
`;
