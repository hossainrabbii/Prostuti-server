import { Types } from "mongoose";
export interface ITemplate {
    _id?: Types.ObjectId;
    userId: Types.ObjectId | string;
    name: string;
    subject: string;
    bodyHtml: string;
    active?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
//# sourceMappingURL=template.interface.d.ts.map