import express from "express";
import product from '../controllers/product-controller';

const router =  express.Router();

router
    .route('/')
    .get(product.getAllProducts)
    .post(product.createProduct);

export default router;