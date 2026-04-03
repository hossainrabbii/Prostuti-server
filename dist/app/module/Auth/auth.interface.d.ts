export interface IUser {
    _id?: string;
    email: string;
    password: string;
    role: "user" | "admin";
    createdAt?: Date;
    updatedAt?: Date;
}
export interface ILoginPayload {
    email: string;
    password: string;
}
export interface ITokenPayload {
    id: string;
    email: string;
    role: "user" | "admin";
}
//# sourceMappingURL=auth.interface.d.ts.map