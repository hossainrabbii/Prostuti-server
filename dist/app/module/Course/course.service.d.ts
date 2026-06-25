import { ICourse } from "./course.interface.js";
export declare const CourseServices: {
    createCourseIntoDB: (payload: ICourse) => Promise<import("mongoose").Document<unknown, {}, ICourse, {}, import("mongoose").DefaultSchemaOptions> & ICourse & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    getAllCoursesFromDB: () => Promise<(import("mongoose").Document<unknown, {}, ICourse, {}, import("mongoose").DefaultSchemaOptions> & ICourse & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    })[]>;
    getSingleCourseFromDB: (id: string) => Promise<(import("mongoose").Document<unknown, {}, ICourse, {}, import("mongoose").DefaultSchemaOptions> & ICourse & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    updateCourseInDB: (id: string, payload: Partial<ICourse>) => Promise<(import("mongoose").Document<unknown, {}, ICourse, {}, import("mongoose").DefaultSchemaOptions> & ICourse & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    deleteCourseFromDB: (id: string) => Promise<(import("mongoose").Document<unknown, {}, ICourse, {}, import("mongoose").DefaultSchemaOptions> & ICourse & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }) | null>;
};
//# sourceMappingURL=course.service.d.ts.map