import { IEnrollment } from "./enrollment.interface.js";
export declare const EnrollmentServices: {
    createEnrollmentIntoDB: (payload: IEnrollment) => Promise<import("mongoose").Document<unknown, {}, IEnrollment, {}, import("mongoose").DefaultSchemaOptions> & IEnrollment & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    getStudentEnrollmentsFromDB: (studentId: string) => Promise<(import("mongoose").Document<unknown, {}, IEnrollment, {}, import("mongoose").DefaultSchemaOptions> & IEnrollment & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    })[]>;
    getAllEnrollmentsFromDB: () => Promise<(import("mongoose").Document<unknown, {}, IEnrollment, {}, import("mongoose").DefaultSchemaOptions> & IEnrollment & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    })[]>;
    updateEnrollmentStatusInDB: (id: string, status: string) => Promise<(import("mongoose").Document<unknown, {}, IEnrollment, {}, import("mongoose").DefaultSchemaOptions> & IEnrollment & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }) | null>;
};
//# sourceMappingURL=enrollment.service.d.ts.map