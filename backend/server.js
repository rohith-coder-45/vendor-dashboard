const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bookingsRoute = require('./routes/bookings');

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Connect to MongoDB (clean, no deprecated options)
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/vendor-dashboard')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

// ✅ Use bookings route
app.use('/api/bookings', bookingsRoute);

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
