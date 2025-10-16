import {
  createEvent,
  getEventById,
  getUpcomingEvents,
} from "../models/event.model.js";
import {
  registerUserForEvent,
  cancelRegistration,
  countRegistrations,
} from "../models/registration.models.js";
import { getUserById } from "../models/user.model.js";
import pool from "../db/db.js";


export const createNewEvent = async (req, res) => {
  try {
    const { title, date, location, capacity } = req.body;

    if (!title || !date || !location || capacity == null) {
      return res.status(400).json({ message: "All credentials are required" });
    }

    if (capacity <= 0 || capacity > 1000)
      return res.status(400).json({ error: "Capacity must be between 1–1000" });

    const event = await createEvent(title, date, location, capacity);

    return res
      .status(201)
      .json({ message: "new event created successfully ", eventId: event.id });
  } catch (err) {
    console.error("Error creating event:", err.message);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getEventDetails = async (req, res) => {

  const { id } = req.params;

  try {
    const event = await getEventById(id);

    if (!event) return res.status(404).json({ error: "Event not found" });

    const registrations = await pool.query(
      "SELECT users.id, users.name, users.email FROM registrations JOIN users ON users.id = registrations.user_id WHERE registrations.event_id = $1",
      [id]
    );

    return res.json({ ...event, registeredUsers: registrations.rows });
  } catch (err) {
    console.error("Error fetching user:", err.message);
    return res.status(500).json({ message: "Server error" });
  }
};

export const registerForEvent = async (req, res) => {

  try {
    const { userId, eventId } = req.body;

    const user = await getUserById(userId);

    const event = await getEventById(eventId);

    if (!user || !event)
      return res.status(404).json({ error: "User or Event not found" });

    if (new Date(event.date) < new Date())
      return res.status(400).json({ error: "Cannot register for past events" });

    const totalRegs = await countRegistrations(eventId);

    if (totalRegs >= event.capacity)
      return res.status(400).json({ error: "Event is full" });

    const reg = await registerUserForEvent(userId, eventId);

    return res
      .status(201)
      .json({ message: "event register sucessfully ", reg });

  } catch (err) {
    if (err.message.toLowerCase().includes("duplicate")) {
      return res.status(409).json({ error: "User already registered" });
    }
    return res.status(500).json({ error: "Server error" });
  }

};



export const cancelEventRegistration = async (req, res) => {
  try {
    const { userId, eventId } = req.body;

    const deleted = await cancelRegistration(userId, eventId);

    if (!deleted)
      return res.status(404).json({ error: "User was not registered" });

    return res.json({ message: "Registration cancelled" });
  } catch (err) {
    console.error("Error concel registration:", err.message);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getUpcoming = async (req, res) => {
  try {
    const events = await getUpcomingEvents();
    return res.json(events);
  } catch (err) {
    console.error("get updacoming eror :", err.message);
    return res.status(500).json({ message: "Server error" });
  }
};


export const getEventStats = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await getEventById(id);

    if (!event) {
      return res.status(400).json({ message: "id is invalid " });
    }

    const totalRegs = await countRegistrations(id);

    const remaining = event.capacity - totalRegs;

    const percentage = ((totalRegs / event.capacity) * 100).toFixed(2);

    return res.json({ totalRegs, remaining, percentageUsed: `${percentage}%` });
  } catch (err) {
    console.error("Error fetching user:", err.message);
    return res.status(500).json({ message: "Server error" });
  }
};
