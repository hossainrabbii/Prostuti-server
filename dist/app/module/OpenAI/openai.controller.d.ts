import { Types } from "mongoose";
export interface IOpenAI {
    _id?: Types.ObjectId;
    name: string;
    prompt: string;
    model: string;
    temperature?: number;
    maxTokens?: number;
    active?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
//# sourceMappingURL=openai.controller.d.ts.map