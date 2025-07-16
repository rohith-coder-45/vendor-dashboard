const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  id: String,
  bookingId: String,
  vendor: String,
  amount: Number,
  date: String,
});

module.exports = mongoose.model('Invoice', invoiceSchema);
