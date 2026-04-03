import { ILoginPayload } from "./auth.interface.js";
export declare const AuthService: {
    register: (email: string, password: string) => Promise<{
        id: string;
        email: string;
        role: "user" | "admin";
    }>;
    login: ({ email, password }: ILoginPayload) => Promise<{
        id: string;
        email: string;
        role: "user" | "admin";
    }>;
    getById: (id: string) => Promise<{
        id: string;
        email: string;
        role: "user" | "admin";
    }>;
    getRefreshUser: (id: string) => Promise<{
        id: string;
        email: string;
        role: "user" | "admin";
    }>;
};
//# sourceMappingURL=auth.service.d.ts.map