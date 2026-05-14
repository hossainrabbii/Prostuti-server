import { Schema, model } from "mongoose";
const templateSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    subject: {
        type: String,
        required: true,
        trim: true,
    },
    bodyHtml: {
        type: String,
        required: true,
    },
    active: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
});
templateSchema.index({ userId: 1, name: 1 }, { unique: true });
export const TemplateModel = model("Template", templateSchema);
//# sourceMappingURL=template.model.js.map