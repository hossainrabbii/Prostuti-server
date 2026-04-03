import { IWebsite } from "./website.interface.js";
export declare const WebsiteService: {
    createWebsite: (payload: IWebsite) => Promise<import("mongoose").Document<unknown, {}, IWebsite, {}, import("mongoose").DefaultSchemaOptions> & IWebsite & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    getAllWebsites: () => Promise<(import("mongoose").Document<unknown, {}, IWebsite, {}, import("mongoose").DefaultSchemaOptions> & IWebsite & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    getSingleWebsite: (id: string) => Promise<(import("mongoose").Document<unknown, {}, IWebsite, {}, import("mongoose").DefaultSchemaOptions> & IWebsite & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    updateWebsite: (id: string, payload: Partial<IWebsite>) => Promise<(import("mongoose").Document<unknown, {}, IWebsite, {}, import("mongoose").DefaultSchemaOptions> & IWebsite & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    deleteWebsite: (id: string) => Promise<(import("mongoose").Document<unknown, {}, IWebsite, {}, import("mongoose").DefaultSchemaOptions> & IWebsite & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
};
//# sourceMappingURL=website.service.d.ts.map