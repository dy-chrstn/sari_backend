import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    createdBy:{
        type: String,
    },
    updatedBy:{
        type: String,
    }
});

export const NoteModel = mongoose.model("Note", noteSchema)