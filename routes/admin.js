import { Router } from "express";
const router = Router();


// Controllers
import { VerifySociety } from "../controllers/admin/AdminController.js";
import AdminAuth from "../middleware/AdminAuth.js";

// Auth Routes
router.post("/verifySociety", AdminAuth, VerifySociety);
// router.post("/register", Publish);
// router.post("/delete", Publish);


export default router;
