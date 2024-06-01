import express from "express";
import login  from "../controllers/login_controller";

const router = express.Router();

router
    .route('/')
    .post(login)

export default router;