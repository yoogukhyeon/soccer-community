export interface INews {
    readonly title: string;
    readonly category: number;
    readonly categoryName: string;
    readonly content: string;
    readonly id: number;
    readonly no?: number;
}

export interface IRecommend {
    readonly no: number;
}
