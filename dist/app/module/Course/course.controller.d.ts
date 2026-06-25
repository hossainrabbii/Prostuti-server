import { Request, Response } from "express";
export declare const CourseControllers: {
    createCourse: (req: Request, res: Response) => Promise<void>;
    getAllCourses: (req: Request, res: Response) => Promise<void>;
    getSingleCourse: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    updateCourse: (req: Request, res: Response) => Promise<void>;
    deleteCourse: (req: Request, res: Response) => Promise<void>;
};
//# sourceMappingURL=course.controller.d.ts.map