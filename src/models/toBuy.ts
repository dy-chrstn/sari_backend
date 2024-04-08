import mongoose from "mongoose";

const toBuySchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    products: {
        type: Array
    },
    quantity:{
        type: Number
    },
    total: {
        type: Number
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

export const ToBuyModel = mongoose.model("ToBuy", toBuySchema)