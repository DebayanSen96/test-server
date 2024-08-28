const mongoose = require("mongoose");
const gameSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    turf_ids: [{ type: String }]
  });
  
  
  module.exports = mongoose.model('Game', gameSchema)