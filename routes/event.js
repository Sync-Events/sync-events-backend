import { Router } from "express";
const router = Router();


// Controllers
import {Publish, GetEvents, EventsOfSociety, Register} from "../controllers/event/EventController.js";
import UserAuth from "../middleware/userauth.js";

// Auth Routes
router.post("/publish",UserAuth,Publish);
router.get("/allEvents",GetEvents);
router.get("/ofsociety/:id",EventsOfSociety);

router.post("/registerIn/:id", UserAuth,Register);
// router.post("/delete", Publish);


export default router;
