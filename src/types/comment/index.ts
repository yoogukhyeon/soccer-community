export interface ICommentData {
    content: string;
    boardNo?: number;
    no?: number;
    id: number;
}

export interface IReplyData extends ICommentData {
    commentNo: number;
}
