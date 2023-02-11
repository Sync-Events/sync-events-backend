import { Router } from "express";
const router = Router();


// Controllers
import {
  Register,
  Login
} from "../controllers/AuthController.js";

// Auth Routes
router.post("/register", Register);
router.post("/login", Login);



export default router;
