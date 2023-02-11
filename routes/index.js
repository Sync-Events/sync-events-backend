import { Router } from "express";
const router = Router();

// Routes
import authRoutes from "./auth.js";
import eventRoutes from './event.js'

router.use("/api/v1/auth", authRoutes);
router.use("/api/v1/event", eventRoutes);

export default router;
