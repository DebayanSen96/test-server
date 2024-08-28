const mongoose = require("mongoose");
const reviewSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  turf_id: { type: String, required: true },
  user_id: { type: String, required: true },
  date: { type: Date, required: true },
  rating: { type: Number, required: true },
  review_text: { type: String, required: true },
});

module.exports = mongoose.model("Review", reviewSchema);
