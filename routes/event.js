import { Router } from "express";
const router = Router();


// Controllers
import {Publish, GetEvents, EventsOfSociety, Register, GetAllRegisteredEventsByUser, GetAllUsersRegisteredInEvent, GetEventWithId, HasUserRegistered} from "../controllers/event/EventController.js";
import UserAuth from "../middleware/UserAuth.js";

// Auth Routes
router.post("/publish",UserAuth,Publish);
router.get("/allEvents",GetEvents);
router.get("/getEventWithId/:eventId",GetEventWithId);
router.get("/hasUserRegistered/:eventId",UserAuth,HasUserRegistered);
router.get("/ofsociety/:id",EventsOfSociety);
router.post("/registerIn/:id", UserAuth,Register);


router.get("/registredByUser",UserAuth,GetAllRegisteredEventsByUser); // get all events in which user regisered
router.get("/UsersOfEvent/:eventId", GetAllUsersRegisteredInEvent); // get all users registered in a event




// router.post("/delete", Publish);


export default router;
