const mongoose = require("mongoose");
const bookingSchema = new mongoose.Schema({
    id: {
      type: String,
      required: true,
      unique: true,
    },
    user_id: { type: String, required: true },
    turf_id: { type: String, required: true },
    manager_id: { type: String, required: true },
    timing: {
      start_time: { type: Date, required: true },
      end_time: { type: Date, required: true }
    },
    payment_status: { type: Boolean, required: true },
    people_count: { type: Number, required: true },
    game: { type: String, required: true }
  });
  module.exports = mongoose.model('Booking', bookingSchema)