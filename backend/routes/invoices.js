const express = require('express');
const router = express.Router();
const Invoice = require('../models/Invoice');

router.get('/', async (req, res) => {
  const invoices = await Invoice.find();
  res.json(invoices);
});

router.post('/', async (req, res) => {
  const invoice = new Invoice(req.body);
  await invoice.save();
  res.json({ success: true });
});

module.exports = router;
