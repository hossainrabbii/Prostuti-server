import { Schema, model } from "mongoose";
const otpSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    // auto delete when expiresAt is reached
    expiresAt: {
        type: Date,
        required: true,
        index: { expires: 0 },
    },
}, { timestamps: true });
export const OtpModel = model("Otp", otpSchema);
//# sourceMappingURL=otp.model.js.map