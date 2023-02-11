import { Router } from "express";
const router = Router();


// Controllers
import { VerifySociety } from "../controllers/admin/AdminController.js";
import AdminAuth from "../middleware/AdminAuth.js";

// Auth Routes
router.post("/verifySociety", AdminAuth, VerifySociety);



export default router;
