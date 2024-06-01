import express from "express";
import product from '../controllers/product-controller';
import authentication from "../middlewares/auth_middleware";

const router =  express.Router();

router
    .use(authentication)
    .route('/')
    .get(product.getAllProducts)
    .post(product.createProduct);

export default router;