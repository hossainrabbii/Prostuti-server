import { Request, Response } from "express";
export declare const EnrollmentControllers: {
    createEnrollment: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    getStudentEnrollments: (req: Request, res: Response) => Promise<void>;
    getAllEnrollments: (req: Request, res: Response) => Promise<void>;
    updateStatus: (req: Request, res: Response) => Promise<void>;
};
//# sourceMappingURL=enrollment.controller.d.ts.map