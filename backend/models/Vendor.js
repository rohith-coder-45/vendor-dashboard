const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
  email: String,
  password: String,
});

module.exports = mongoose.model('Vendor', vendorSchema);
