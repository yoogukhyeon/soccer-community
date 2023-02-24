interface User {
    readonly email: string;
    readonly id: string;
    readonly name: string;
}
export interface IAuth {
    readonly accessToken: string | null;
    readonly user: User | null;
}

export interface IHistory {
    readonly token: string;
    readonly id: number;
}
