const express = require('express');
const router = express.Router();
const Vendor = require('../models/Vendor');

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const vendor = await Vendor.findOne({ email, password });
  if (vendor) {
    res.json({ token: 'mock-token', email });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

module.exports = router;
