const mongoose = require("mongoose");

const TicketSchema = new mongoose.Schema({
  customerName: String,
  source: String,
  destination: String,
  travellingDate: Date,
  bookingDate: Date,
  ticketNumber: String,
  ticketAmount: Number,
  commission: Number,
  totalAmount: Number
}, { timestamps: true });

module.exports = mongoose.model("Ticket", TicketSchema);
