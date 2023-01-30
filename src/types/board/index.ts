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
    readonly category: string;
    readonly title: string;
    readonly content: string;
    readonly like: number;
    readonly view: number;
    readonly regDate: string;
}
