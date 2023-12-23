import mongoose from "mongoose";

const igVideoSchema = new mongoose.Schema({
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

const igVideoModel = mongoose.model('igVideo', igVideoSchema);

export { igVideoModel };