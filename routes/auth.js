import { Router } from "express";
const router = Router();


// Controllers
import {
  RegisterSociety,
} from "../controllers/AuthController.js";

// Auth Routes
router.post("/register/society", RegisterSociety);
// router.post("/register/user", UserLogin);
// router.post("/login/society", UserLogin);
// router.post("/login/user", UserLogin);


export default router;
