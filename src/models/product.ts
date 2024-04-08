import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,  
    },
    photoUrl:{
        type: String,
    },
    name: {
        type: String,
        required: true,
    },
    dp: {
        type: Number,  
    },
    srp: {
        type: Number,
    },
    type:{
        type: Array,
    },
    selectedType:{
        type: Number,
    },
    sizes:{
        type: Array, 
    },
    selectedSize:{
        type: Number,
    },
    prices: {
        type: Array,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    createdBy: {
        type: String,
    },
    updatedBy: {
        type: String,
    },
    description: {
        type: String,
    }
});

export const ProductModel = mongoose.model("Product", productSchema)