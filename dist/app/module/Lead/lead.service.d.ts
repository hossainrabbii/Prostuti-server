import { ILead } from "./lead.interface.js";
export declare const LeadService: {
    getAllLeads: (userId: string) => Promise<(import("mongoose").Document<unknown, {}, ILead, {}, import("mongoose").DefaultSchemaOptions> & ILead & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    getSingleLead: (id: string, userId: string) => Promise<import("mongoose").Document<unknown, {}, ILead, {}, import("mongoose").DefaultSchemaOptions> & ILead & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    createLead: (payload: ILead) => Promise<import("mongoose").Document<unknown, {}, ILead, {}, import("mongoose").DefaultSchemaOptions> & ILead & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    updateLead: (id: string, userId: string, payload: Partial<ILead>) => Promise<import("mongoose").Document<unknown, {}, ILead, {}, import("mongoose").DefaultSchemaOptions> & ILead & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    deleteLead: (id: string, userId: string) => Promise<import("mongoose").Document<unknown, {}, ILead, {}, import("mongoose").DefaultSchemaOptions> & ILead & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
};
//# sourceMappingURL=lead.service.d.ts.map