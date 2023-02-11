import { Router } from "express";
const router = Router();

// Routes
import authRoutes from "./auth.js";

router.use("/api/v1/auth", authRoutes);

export default router;
