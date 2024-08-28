const mongoose = require("mongoose");
const turfSchema = new mongoose.Schema({
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    location: {
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true },
      address: { type: String, required: true }
    },
    city: { type: String, required: true },
    price_per_hour: { type: Number, required: true },
    rating: { type: Number, required: true },
    reviews: [{ type: String }],
    games_offered: [{ type: String }],
    timings: {
      start_time: { type: String, required: true },
      end_time: { type: String, required: true }
    },
    weekdays_open: [{ type: String, required: true }],
    manager_id: { type: String, required: true },
    bookings: [{ type: String }],
    pictures: [{ type: String }]
  });
  
  module.exports = mongoose.model('Turf', turfSchema)