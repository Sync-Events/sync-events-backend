import { Router } from "express";
const router = Router();


// Controllers
import {Publish, GetEvents, EventsOf} from "../controllers/event/EventController.js";
import UserAuth from "../middleware/userauth.js";

// Auth Routes
router.post("/publish",UserAuth,Publish);
router.get("/allEvents",GetEvents);
router.get("/of/:id",EventsOf);

// router.post("/register", Publish);
// router.post("/delete", Publish);


export default router;
