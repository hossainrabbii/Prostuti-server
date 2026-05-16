export interface IUser {
    _id?: string;
    email: string;
    password: string;
    role: "user" | "admin";
    isVerified: boolean;
    appPassword?: string;
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
//# sourceMappingURL=user.interface.d.ts.map