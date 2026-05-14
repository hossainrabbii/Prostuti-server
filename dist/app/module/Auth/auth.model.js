import { Schema, model } from "mongoose";
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    // NEW
    isVerified: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });
export const UserModel = model("User", userSchema);
//# sourceMappingURL=auth.model.js.map