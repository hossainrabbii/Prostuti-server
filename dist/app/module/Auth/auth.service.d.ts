import { ILoginPayload } from "./auth.interface.js";
export declare const AuthService: {
    register: (email: string, password: string) => Promise<{
        userId: string;
        email: string;
    }>;
    verifyOTP: (userId: string, otp: string) => Promise<{
        id: string;
        email: string;
        role: "user" | "admin";
        isVerified: boolean;
    }>;
    resendOTP: (userId: string) => Promise<{
        email: string;
    }>;
    login: ({ email, password }: ILoginPayload) => Promise<{
        id: string;
        email: string;
        role: "user" | "admin";
        isVerified: true;
    }>;
    getById: (id: string) => Promise<{
        id: string;
        email: string;
        role: "user" | "admin";
        isVerified: boolean;
    }>;
    getRefreshUser: (id: string) => Promise<{
        id: string;
        email: string;
        role: "user" | "admin";
        isVerified: boolean;
    }>;
};
//# sourceMappingURL=auth.service.d.ts.map