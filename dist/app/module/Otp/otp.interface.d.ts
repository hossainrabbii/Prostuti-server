import { Types } from "mongoose";
export interface IOtp {
    userId: Types.ObjectId | string;
    otp: string;
    expiresAt: Date;
    createdAt?: Date;
}
//# sourceMappingURL=otp.interface.d.ts.map