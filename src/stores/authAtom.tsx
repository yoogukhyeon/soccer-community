import { IAuth } from '@/types/auth';
import { atom } from 'jotai';

//상태생성
const authAtom = atom<IAuth>({
    accessToken: null,
    user: null,
});

export default authAtom;
