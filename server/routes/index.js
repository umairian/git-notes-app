import { Router } from "express";
const router = Router();

// Routers
import authRouter from "./auth.js";

router.use("/auth", authRouter);

export default router;
