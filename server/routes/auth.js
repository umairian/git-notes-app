import { Router } from "express";
const router = Router();

// Middlewares

// Controllers
import controller from "../controllers/auth.js";

// Routes

router.post("/login", controller.login);

export default router;
