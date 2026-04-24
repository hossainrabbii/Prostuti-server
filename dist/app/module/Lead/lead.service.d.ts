import { ILead } from "./lead.interface.js";
export declare const LeadService: {
    createLead: (payload: ILead) => Promise<import("mongoose").Document<unknown, {}, ILead, {}, import("mongoose").DefaultSchemaOptions> & ILead & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    getAllLeads: () => Promise<(import("mongoose").Document<unknown, {}, ILead, {}, import("mongoose").DefaultSchemaOptions> & ILead & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    getSingleLead: (id: string) => Promise<(import("mongoose").Document<unknown, {}, ILead, {}, import("mongoose").DefaultSchemaOptions> & ILead & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    updateLead: (id: string, payload: Partial<ILead>) => Promise<(import("mongoose").Document<unknown, {}, ILead, {}, import("mongoose").DefaultSchemaOptions> & ILead & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    deleteLead: (id: string) => Promise<(import("mongoose").Document<unknown, {}, ILead, {}, import("mongoose").DefaultSchemaOptions> & ILead & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
};
//# sourceMappingURL=lead.service.d.ts.map