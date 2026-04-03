import { Schema, model } from "mongoose";
const templateSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
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
export const TemplateModel = model("Template", templateSchema);
//# sourceMappingURL=template.model.js.map