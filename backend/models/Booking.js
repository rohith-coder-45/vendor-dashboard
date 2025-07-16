// models/Booking.js

const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  id: { type: String, required: true },
  date: { type: String, required: true },
  driver: { type: String, required: true },
  vehicleType: { type: String },
  vehicleNo: { type: String, required: true },
  location: { type: String },
  contact: { type: String },
  company: { type: String },
  status: { type: String, default: 'Ongoing' },
});

module.exports = mongoose.model('Booking', bookingSchema);
