const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Import Routes
const authRoutes = require('./routes/auth');
const bookingRoutes = require('./routes/bookings');
const invoiceRoutes = require('./routes/invoices');

const app = express();

// ✅ CORS (Allow all origins, including frontend on Vercel)
app.use(cors({
  origin: '*',
}));

app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/invoices', invoiceRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(5000, () =>
      console.log('🚀 Backend running at http://localhost:5000')
    );
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });
