import express from "express";
import home from "../controllers/home";

const router =  express.Router();

router
    .route('/')
    .get(home.homePage)
    
export default router;