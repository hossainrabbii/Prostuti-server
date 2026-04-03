import { Request, Response, NextFunction } from "express";
import { ITokenPayload } from "../module/Auth/auth.interface.js";
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