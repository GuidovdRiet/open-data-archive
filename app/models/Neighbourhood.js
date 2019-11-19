const mongoose = require("mongoose");

const neighbourhoodSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  area: {
    type: String,
    required: true
  },
  physicalAverage: {
    type: Number,
    required: true
  },
  safetyAverage: {
    type: Number,
    required: true
  },
  socialAverage: {
    type: Number,
    required: true
  },
  neighbourhoodTotal: {
    type: Number
  },
  neighbourhoodPosition: {
    type: Number
  }
});

module.exports = mongoose.model("Neighbourhood", neighbourhoodSchema);
