import { Router } from "express";
const router = Router();


// Controllers
import {
  Register,
  Login,
  GetUser
} from "../controllers/AuthController.js";

// Auth Routes
router.post("/register", Register);
router.post("/login", Login);
router.get("/getUser/:id", GetUser);





export default router;
