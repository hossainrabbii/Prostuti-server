import { Request, Response, NextFunction } from "express";
export interface ITokenPayload {
    id: string;
    email: string;
    role: "user" | "admin";
}
declare global {
    namespace Express {
        interface Request {
            user?: ITokenPayload;
        }
    }
}
export declare const authenticate: (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export declare const authorizeAdmin: (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=authenticate.d.ts.map