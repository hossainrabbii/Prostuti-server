import { NextFunction, Request, Response } from "express";
export declare const createLead: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const LeadController: {
    createLead: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getAllLeads: (_req: Request, res: Response, next: NextFunction) => Promise<void>;
    getSingleLead: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    updateLead: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    deleteLead: (req: Request, res: Response, next: NextFunction) => Promise<void>;
};
//# sourceMappingURL=lead.controller.d.ts.map