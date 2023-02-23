import styled from 'styled-components';
import Layout from '@/components/layout/Layout';
import { Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import Board from '@/pages/board';
import MetaTag from '@/constants/SEOMetaTag';
import NotFound from '@/pages/notFound';
import BoardCreate from '@/pages/board/Create';
import BoardDetail from '@/pages/board/detail';
import BoardUpdate from '@/pages/board/detail/Update';
import Course from '@/pages/course';
import SignIn from './pages/user/SignIn';
import SignUp from './pages/user/SignUp';
import { useAtom } from 'jotai';
import authAtom from './stores/authAtom';
import Cookies from 'universal-cookie';
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getUser } from './api/user';
import FootballNews from './pages/footballNews';
import PrivateRouter from './pages/privateRouter';

const Wrapper = styled.div`
    width: 100%;

    ${({ theme }) => theme.media.desktop`
        
    `}
    ${({ theme }) => theme.media.tablet`
    
    `}
    ${({ theme }) => theme.media.mobile`
    
    `};
`;

function App() {
    const navigate = useNavigate();
    const [_, setAuth] = useAtom(authAtom);
    const cookies = new Cookies();
    const accessToken = cookies.get('access_token');
    const refreshToken = cookies.get('refresh_token');

    useEffect(() => {
        const chkAuth = async () => {
            try {
                const res = await getUser(accessToken, refreshToken);
                const data = res?.data?.data;

                if (data?.accessToken) {
                    const accessToken = data.accessToken;
                    cookies.remove('access_token', { domain: `${process.env.REACT_APP_API_URL}`, path: '/' });
                    cookies.set('access_token', accessToken, {
                        secure: true,
                        maxAge: 1000 * 60 * 60 * 24 * 7,
                        path: '/',
                    });
                    const user = data?.authInfo;
                    user && setAuth((auth) => ({ ...auth, accessToken, user }));
                } else {
                    const user = data?.authInfo;
                    user && setAuth((auth) => ({ ...auth, accessToken, user }));
                }
            } catch (err) {
                alert('로그인을 다시 해주세요.');
                setAuth((auth) => ({ ...auth, accessToken: null, user: null }));
                navigate('/user/sign-in');
            }
        };

        if (refreshToken) {
            chkAuth();
        } else {
            setAuth((auth) => ({ ...auth, accessToken: null, refreshToken: null, user: null }));
        }
    }, [refreshToken]);

    return (
        <>
            <MetaTag
                title="에프엔에프 - 축구, 최신축구소식, 축구소식"
                description="축구, 축구소식, 최신축구소식, 피파, 피파온라인, 에펨, 축구커뮤니티"
            />
            <Wrapper>
                <Layout>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/boards" element={<Board />}>
                            <Route path=":category" element={<Board />} />
                        </Route>
                        <Route path="/boards/detail">
                            <Route path=":id" element={<BoardDetail />} />
                            <Route
                                path=":id/update"
                                element={
                                    <PrivateRouter>
                                        <BoardUpdate />
                                    </PrivateRouter>
                                }
                            />
                        </Route>
                        <Route
                            path="/boards/create"
                            element={
                                <PrivateRouter>
                                    <BoardCreate />
                                </PrivateRouter>
                            }
                        />
                        <Route path="*" element={<NotFound />} />
                        <Route path="/course" element={<Course />}>
                            <Route path=":vod" element={<Course />} />
                        </Route>
                        <Route path="/football-news" element={<FootballNews />} />
                        <Route path="/user">
                            <Route path="sign-in" element={<SignIn />} />
                            <Route path="sign-up" element={<SignUp />} />
                        </Route>
                    </Routes>
                </Layout>
            </Wrapper>
        </>
    );
}

export default App;
