import { Router } from "express";
const router = Router();

// Routes
import authRoutes from "./auth.js";
import eventRoutes from './event.js';
import adminRoutes from './admin.js';
import walletRoutes from './wallet.js';

router.use("/api/v1/auth", authRoutes);
router.use("/api/v1/event", eventRoutes);
router.use("/api/v1/admin", adminRoutes);
router.use("/api/v1/wallet", walletRoutes);

export default router;
