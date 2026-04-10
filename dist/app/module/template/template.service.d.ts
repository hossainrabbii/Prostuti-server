import { Types } from "mongoose";
import { ITemplate } from "./template.interface.js";
export declare const TemplateService: {
    createTemplate: (payload: ITemplate) => Promise<(import("mongoose").Document<unknown, {}, ITemplate, {}, import("mongoose").DefaultSchemaOptions> & ITemplate & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | {
        success: boolean;
        message: string;
    }>;
    getAllTemplates: () => Promise<(import("mongoose").Document<unknown, {}, ITemplate, {}, import("mongoose").DefaultSchemaOptions> & ITemplate & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    getSingleTemplate: (id: string) => Promise<import("mongoose").Document<unknown, {}, ITemplate, {}, import("mongoose").DefaultSchemaOptions> & ITemplate & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    updateTemplate: (id: string, payload: Partial<ITemplate>) => Promise<import("mongoose").Document<unknown, {}, ITemplate, {}, import("mongoose").DefaultSchemaOptions> & ITemplate & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    deleteTemplate: (id: string) => Promise<import("mongoose").Document<unknown, {}, ITemplate, {}, import("mongoose").DefaultSchemaOptions> & ITemplate & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
};
//# sourceMappingURL=template.service.d.ts.map