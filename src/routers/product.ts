import express from "express";

import { registerProduct, getProducts, updateProduct, deleteProduct } from "../controllers/product";
import { tokenAuth } from "../middleware/index";

export default (router: express.Router) => {
    router.post("/registerProduct/:id", tokenAuth, registerProduct);
    router.get("/getProducts/:id", tokenAuth, getProducts);
    router.patch("/updateProduct/:productId", tokenAuth, updateProduct);
    router.delete("/deleteProduct/:productId", tokenAuth, deleteProduct);
}