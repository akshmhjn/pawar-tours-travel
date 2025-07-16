const express = require("express");
const Ticket = require("../models/Ticket");
const router = express.Router();

// Get tickets, optionally filtered by booking date
router.get("/", async (req, res) => {
  const filter = req.query.date ? { bookingDate: new Date(req.query.date) } : {};
  const tickets = await Ticket.find(filter).sort({ travellingDate: -1 });
  res.json(tickets);
});

// Add new ticket
router.post("/", async (req, res) => {
  const ticket = new Ticket(req.body);
  await ticket.save();
  res.json(ticket);
});

// Get ticket by ID
router.get("/:id", async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);
  res.json(ticket);
});

// Update ticket
router.put("/:id", async (req, res) => {
  const ticket = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(ticket);
});

// Delete ticket
router.delete("/:id", async (req, res) => {
  await Ticket.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});


module.exports = router;
