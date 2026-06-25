import { Schema, model } from 'mongoose';
const linksSchema = new Schema({
    liveUrl: {
        type: String,
        trim: true,
        default: "",
    },
    examUrl: {
        type: String,
        trim: true,
        default: "",
    },
}, {
    timestamps: true, // এটি অটোমেটিক updatedAt ট্র্যাক রাখবে
    versionKey: false,
});
export const Links = model('Links', linksSchema);
//# sourceMappingURL=link.model.js.map