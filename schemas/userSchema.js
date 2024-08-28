const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
 
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone_number: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  payment_info: {
    card_number: { type: String, required: true },
    expiry_date: { type: String, required: true },
    cvv: { type: Number, required: true },
  },
  booking_history: [{ type: String }]
});





module.exports = mongoose.model('User', userSchema)