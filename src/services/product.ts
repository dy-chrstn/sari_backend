import { ProductModel } from "../models/product";

export const createProduct = async (data: any) => {
    try {
        return await new ProductModel(data).save();
    } catch (error) {
        return console.log(error);
    }
}

export const findProductById = async (productId: string) => {
    try {
        return await ProductModel.findOne({ _id: productId });
    } catch (error) {
        return console.log(error);
    }
}

export const findAllProductsById = async (userId: string) => {
    try {
        return await ProductModel.find({ userId: userId });
    } catch (error) {
        return console.log(error);
    }
}

export const updateProductById = async (productId: string, data: any) => {
    try {
        return await ProductModel.findOneAndUpdate({ _id: productId }, data, { new: true });
    } catch (error) {
        return console.log(error);
    }
}

export const deleteProductById = async (productId: string) => {
    try {
        return await ProductModel.findOneAndDelete({ _id: productId });
    } catch (error) {
        return console.log(error);
    }
}