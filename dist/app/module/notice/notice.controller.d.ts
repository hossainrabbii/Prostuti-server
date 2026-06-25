import { Request, Response } from 'express';
export declare const NoticeControllers: {
    createNotice: (req: Request, res: Response) => Promise<void>;
    getAllNotices: (req: Request, res: Response) => Promise<void>;
    getSingleNotice: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    updateNotice: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    deleteNotice: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
};
//# sourceMappingURL=notice.controller.d.ts.map