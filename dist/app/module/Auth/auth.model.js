import { Schema, model } from "mongoose";
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true, // NEW: always lowercase email
    },
    password: {
        type: String,
        required: true,
        select: false, // NEW: never return password in any query
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
}, { timestamps: true });
export const UserModel = model("User", userSchema);
//# sourceMappingURL=auth.model.js.map