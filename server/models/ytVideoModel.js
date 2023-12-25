import mongoose from "mongoose";

const ytVideoSchema = new mongoose.Schema({
    creator: {
        type: String,
        unique: true,
        required: true
    },
    videos: {
        type: [String],
        unique: true,
        // required: true
    },
    thumbnails:{
        type: [String], 
        // required: true
    }
}, { timestamps: true })

const ytVideoModel = mongoose.model('ytVideo', ytVideoSchema);

export { ytVideoModel };