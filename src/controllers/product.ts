import express from "express";

import { createProduct, findProductById, findAllProductsById, updateProductById, deleteProductById } from "../services/product";
import { findUserById } from "../services/user";

export const registerProduct = async (req: express.Request, res: express.Response) => {
    try {
        const userId = req.params.id;
        const { name, dp, srp, types, sizes, prices, createdBy, updatedBy, description  } = req.body;

        const userExists = await findUserById(userId);
        if (!userExists) {
            return res.status(400).json({
                messages: {
                    code: 1,
                    message: "User not found",
                },
                response: {},
            });
        }

        const productData = {
            userId,
            name,
            dp,
            srp,
            types,
            sizes,
            prices,
            createdBy,
            updatedBy,
            description
        }

        const product = await createProduct(productData);
        return res.status(200).json({
            messages: {
                code: 0,
                message: "Product created",
            },
            response: product,
        });
    } catch (error) {
        return res.status(500).json({
            messages: {
                code: 1,
                message: "Internal server error",
            },
            response: {},
        });
    }
};

export const getProduct = async (req: express.Request, res: express.Response) => {
    try {
        const userId = req.params.userId;
        const productId = req.params.productId;

        const userExists = await findUserById(userId);
        if (!userExists) {
            return res.status(400).json({
                messages: {
                    code: 1,
                    message: "User not found",
                },
                response: {},
            });
        }

        const product = await findProductById(productId);
        return res.status(200).json({
            messages: {
                code: 0,
                message: "Product found",
            },
            response: product,
        });
    } catch (error) {
        return res.status(500).json({
            messages: {
                code: 1,
                message: "Internal server error",
            },
            response: {},
        });
    }
}

export const getProducts = async (req: express.Request, res: express.Response) => {
    try {
        const userId = req.params.userId;

        const userExists = await findUserById(userId);
        if (!userExists) {
            return res.status(400).json({
                messages: {
                    code: 1,
                    message: "User not found",
                },
                response: {},
            });
        }

        const products = await findAllProductsById(userId);

        return res.status(200).json({
            messages: {
                code: 0,
                message: "Products retrieved",
            },
            response: products,
        });
    } catch (error) {
        return res.status(500).json({
            messages: {
                code: 1,
                message: "Internal server error",
            },
            response: {},
        });
    }
}

export const updateProduct = async (req: express.Request, res: express.Response) => {
    try {
        const productId = req.params.productId;
        const { name, dp, srp, types, sizes, prices, createdBy, updatedBy, description } = req.body;

        const productExists = await findProductById(productId);
        if (!productExists) {
            return res.status(400).json({
                messages: {
                    code: 1,
                    message: "Product not found",
                },
                response: {},
            });
        }

        const productData = {
            name,
            dp,
            srp,
            types,
            sizes,
            prices,
            createdBy,
            updatedBy,
            description
        }

        const product = await updateProductById(productId, productData);

        if (!product) {
            return res.status(500).json({
                messages: {
                    code: 1,
                    message: "Internal server error",
                },
                response: {},
            });
        }
        
        return res.status(200).json({
            messages: {
                code: 0,
                message: "Product updated",
            },
            response: product,
        });
    } catch (error) {
        return res.status(500).json({
            messages: {
                code: 1,
                message: "Internal server error",
            },
            response: {},
        });
    }
}

export const deleteProduct = async (req: express.Request, res: express.Response) => {
    try {
        const productId = req.params.productId;

        const productExists = await findProductById(productId);
        if (!productExists) {
            return res.status(400).json({
                messages: {
                    code: 1,
                    message: "Product not found",
                },
                response: {},
            });
        }

        const product = await deleteProductById(productId);
        return res.status(200).json({
            messages: {
                code: 0,
                message: "Product deleted",
            },
            response: product,
        });
    } catch (error) {
        return res.status(500).json({
            messages: {
                code: 1,
                message: "Internal server error",
            },
            response: {},
        });
    }
}