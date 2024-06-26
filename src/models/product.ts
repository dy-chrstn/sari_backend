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
    stock:{
        type: Number,
    },
    types:{
        type: Array,
    },
    sizes:{
        type: Array, 
    },
    prices: {
        type: Array,
    },
    dp:{
        type: Array
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