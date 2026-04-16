import { Request, Response, NextFunction } from "express";
export declare const sendMails: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const sendSingleMail: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const mailEvents: (req: Request, res: Response) => void;
//# sourceMappingURL=mail.controller.d.ts.map