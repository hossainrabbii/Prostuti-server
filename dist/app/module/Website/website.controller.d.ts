import { NextFunction, Request, Response } from "express";
export declare const createWebsite: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const WebsiteController: {
    createWebsite: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getAllWebsites: (_req: Request, res: Response, next: NextFunction) => Promise<void>;
    getSingleWebsite: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    updateWebsite: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    deleteWebsite: (req: Request, res: Response, next: NextFunction) => Promise<void>;
};
//# sourceMappingURL=website.controller.d.ts.map