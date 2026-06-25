import { Model } from 'mongoose';
export interface ILinks {
    liveUrl?: string;
    examUrl?: string;
    updatedAt?: Date;
}
export type LinksModel = Model<ILinks, Record<string, never>>;
//# sourceMappingURL=link.interface.d.ts.map