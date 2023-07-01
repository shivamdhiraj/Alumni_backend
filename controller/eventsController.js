const Event = require("../models/Event");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncError");

// GET route to retrieve all events
exports.getAllEvents = catchAsyncError(async (req, res) => {
  const events = await Event.find({});
  res.json(events);
});

// POST route to create a new event
exports.createEvent = catchAsyncError(async (req, res) => {
  const { title, desc } = req.body;
  const date = new Date();
  const newEvent = new Event({ title, desc, date });
  await newEvent.save();
  res.json({ message: "Event created successfully", newEvent });
});

// GET route to retrieve a specific event by ID
exports.getEventById = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  const event = await Event.findById(id);
  if (!event) {
    return next(new ErrorHandler("Event not found", 404));
  } else {
    res.json(event);
  }
});

// PUT route to update a specific event by ID
exports.updateEvent = catchAsyncError(async (req, res) => {
  const id = req.params.id;
  const { title, desc } = req.body;
  const date = new Date();
  const event = await Event.findByIdAndUpdate(
    id,
    { title, desc, date }
  );
  if (!event) {
    return next(new ErrorHandler("Event not found", 404));
  } else {
    res.json({ message: "Event updated successfully", event });
  }
});

// DELETE route to delete a specific event by ID
exports.deleteEvent = catchAsyncError(async (req, res) => {
  const id = req.params.id;
  const event = await Event.findByIdAndDelete(id);
  if (!event) {
    return next(new ErrorHandler("Event not found", 404));
  } else {
    res.json({ message: "Event deleted successfully", event });
  }
});
