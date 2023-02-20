import { useConfirm } from '@/hooks/useConfirm';
import { useNavigate } from 'react-router-dom';

export const preventGoBack = (state: string) => {
    const navigate = useNavigate();

    const goBack = () => {
        history.pushState(null, '', location.href);

        useConfirm('작성 게시물은 저장되지 않습니다. 뒤로 가시겠습니까?', () => {
            navigate(state);
        });
    };
    const pushGoBack = () => history.pushState(null, '', location.href);
    const addGoBackPrevent = () => window.addEventListener('popstate', goBack);
    const removeGoBackPrevent = () => window.removeEventListener('popstate', goBack);

    return { pushGoBack, addGoBackPrevent, removeGoBackPrevent };
};
