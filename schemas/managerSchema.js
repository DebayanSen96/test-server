const mongoose = require("mongoose");


const managerSchema = new mongoose.Schema({
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
    turfs_owned: [{ type: String }],
    turf_count: { type: Number, required: true }
  });
  




module.exports = mongoose.model('Manager', managerSchema)