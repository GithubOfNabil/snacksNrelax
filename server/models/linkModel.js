import mongoose from "mongoose";

const linkSchema = new mongoose.Schema({
    youtube: [{
        type: [String],
        unique: true
    }],
    instagram: {
        type: [String],
        unique: true,
    },
    tiktok: {
        type: [String],
        unique: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
}, { timestamps: true })

const linkModel = mongoose.model('link', linkSchema);

export { linkModel };