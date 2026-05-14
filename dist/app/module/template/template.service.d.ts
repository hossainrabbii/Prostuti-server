import { Types } from "mongoose";
import { ITemplate } from "./template.interface.js";
export declare const TemplateService: {
    createTemplate: (payload: ITemplate) => Promise<import("mongoose").Document<unknown, {}, ITemplate, {}, import("mongoose").DefaultSchemaOptions> & ITemplate & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    getAllTemplates: (userId: string) => Promise<(import("mongoose").Document<unknown, {}, ITemplate, {}, import("mongoose").DefaultSchemaOptions> & ITemplate & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    getSingleTemplate: (id: string, userId: string) => Promise<import("mongoose").Document<unknown, {}, ITemplate, {}, import("mongoose").DefaultSchemaOptions> & ITemplate & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    updateTemplate: (id: string, userId: string, payload: Partial<ITemplate>) => Promise<import("mongoose").Document<unknown, {}, ITemplate, {}, import("mongoose").DefaultSchemaOptions> & ITemplate & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    deleteTemplate: (id: string, userId: string) => Promise<import("mongoose").Document<unknown, {}, ITemplate, {}, import("mongoose").DefaultSchemaOptions> & ITemplate & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
};
//# sourceMappingURL=template.service.d.ts.map