export interface IBoard {
    readonly id?: number;
    readonly category: string;
    readonly commentCount: number;
    readonly content: string;
    readonly diffDate: string;
    readonly likes: number;
    readonly title: string;
    readonly views: number;
}

export interface IView {
    readonly id: number;
    readonly category: string;
    readonly title: string;
    readonly content: string;
    readonly commentCount: number;
    readonly likes: number;
    readonly views: number;
}
