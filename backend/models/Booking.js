const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  id: String,
  date: String,
  driver: String,
  vehicleType: String,
  vehicleNo: String,
  location: String,
  contact: String,
  company: String,
  status: String,
});

module.exports = mongoose.model('Booking', bookingSchema);
