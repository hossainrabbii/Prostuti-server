import { Request, Response, NextFunction } from "express";
import { ITokenPayload } from "../module/User/user.interface.js";
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