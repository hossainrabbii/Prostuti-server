import { IUser } from "./user.interface.js";
export declare const userServices: {
    registerUser: (data: IUser) => Promise<{
        user: {
            _id: string;
            email: string;
            facebook?: string;
            name: string;
            role: "student" | "admin";
            isActive: boolean;
            appPassword?: string;
            createdAt?: Date;
            updatedAt?: Date;
            __v: number;
        };
        accessToken: string;
    }>;
    loginUser: (payload: Pick<IUser, "email" | "password">) => Promise<{
        user: {
            _id: string;
            email: string;
            facebook?: string;
            name: string;
            role: "student" | "admin";
            isActive: boolean;
            appPassword?: string;
            createdAt?: Date;
            updatedAt?: Date;
            __v: number;
        };
        accessToken: string;
    }>;
};
//# sourceMappingURL=user.service.d.ts.map