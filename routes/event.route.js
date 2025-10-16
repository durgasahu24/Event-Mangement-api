import express from "express";
import {createNewEvent,getEventDetails, registerForEvent, cancelEventRegistration, getUpcoming,getEventStats,
} from "../controller/event.controller.js";

const route = express.Router();

route.post("/", createNewEvent);
route.get("/:id", getEventDetails);
route.post("/register", registerForEvent);
route.post("/cancel", cancelEventRegistration);
route.get("/upcoming/list", getUpcoming);
route.get("/stats/:id", getEventStats);

export default route;
