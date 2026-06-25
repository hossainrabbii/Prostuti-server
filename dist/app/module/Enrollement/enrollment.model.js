import { Schema, model } from "mongoose";
const enrollmentSchema = new Schema({
    studentId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    amount: { type: Number, required: [true, "ভর্তিকালীন কোর্সের মূল্য সংরক্ষণ করা আবশ্যক"] },
    paidNumber: { type: String, required: true, trim: true },
    transactionId: { type: String, required: true, unique: true, trim: true },
    status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending"
    },
}, {
    timestamps: true,
    versionKey: false,
});
export const Enrollment = model("Enrollment", enrollmentSchema);
//# sourceMappingURL=enrollment.model.js.map