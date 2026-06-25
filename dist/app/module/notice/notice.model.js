import { Schema, model } from 'mongoose';
const noticeSchema = new Schema({
    title: {
        type: String,
        required: [true, 'নোটিশের শিরোনাম আবশ্যক'],
        trim: true,
    },
    content: {
        type: String,
        required: [true, 'নোটিশের বিস্তারিত বিবরণ আবশ্যক'],
        trim: true,
    },
}, {
    timestamps: true,
    versionKey: false,
});
export const Notice = model('Notice', noticeSchema);
//# sourceMappingURL=notice.model.js.map