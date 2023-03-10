export interface ICommentData {
    content: string;
    boardNo?: number;
    no?: number;
    id: number;
}

export interface IReplyData extends ICommentData {
    commentNo: number;
}

export interface IDeleteData {
    no: number;
    id: number;
}

export interface ILikeCount {
    no: number;
    type: string;
}
