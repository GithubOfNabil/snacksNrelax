import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    creator: {
        type: String,
        unique: true,
        required: true
    },
    videos: {
        type: [String],
        unique: true,
        required: true
    },
    thumbnails:{
        type: [String], 
        required: true
    }
}, { timestamps: true })

const videoModel = mongoose.model('video', videoSchema);

export { videoModel };