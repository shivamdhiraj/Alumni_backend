const { getAllEvents, createEvent, getEventById, updateEvent, deleteEvent } = require("../controller/eventsController");

const router = require("express").Router();

// GET route to retrieve all events
router.get("/events", getAllEvents);

// POST route to create a new event
router.post("/events", createEvent);

// GET route to retrieve a specific event by ID
router.get("/events/:id", getEventById);

// PUT route to update a specific event by ID
router.put("/events/:id", updateEvent);

// DELETE route to delete a specific event by ID
router.delete("/events/:id", deleteEvent);

module.exports = router;
