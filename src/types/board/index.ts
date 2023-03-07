export interface IBoard {
    readonly no?: number;
    readonly category: string;
    readonly content: string;
    readonly like: number;
    readonly title: string;
    readonly view: number;
    readonly regDate: string;
}

export interface IView {
    readonly no: number;
    readonly name: string;
    readonly category: string;
    readonly categoryName?: string;
    readonly userId: number;
    readonly title: string;
    readonly content: string;
    readonly like: number;
    readonly view: number;
    readonly regDate: string;
    readonly commentCnt: number;
    readonly recommend?: number;
}

export interface ILikeCount {
    readonly no: number;
}

export interface IViewCount {
    readonly no: number;
}

interface User {
    id: number;
    name: string;
    email: string;
}

export interface Auth {
    accessToken: string | null;
    user: User | any;
}
