import express from "express";

import { registerProduct, getProduct, getProducts, updateProduct, deleteProduct } from "../controllers/product";
import { tokenAuth } from "../middleware/index";

export default (router: express.Router) => {
    router.post("/product/register/:id", tokenAuth, registerProduct);
    router.get("/product/get/:userId/:productId", tokenAuth, getProduct);
    router.get("/product/getAll/:userId", tokenAuth, getProducts);
    router.patch("/product/update/:productId", tokenAuth, updateProduct);
    router.delete("/product/delete/:productId", tokenAuth, deleteProduct);
}