import { Router } from "express";
const router = Router();


// Controllers
import {Publish} from "../controllers/event/EventController.js";
import UserAuth from "../middleware/userauth.js";

// Auth Routes
router.post("/publish",UserAuth,Publish);
// router.post("/register", Publish);
// router.post("/delete", Publish);


export default router;
