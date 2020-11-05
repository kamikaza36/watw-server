const mongoose = require('mongoose');

const { Schema } = mongoose;

const measureUnits = new Schema({
  temp: { type: String },
  windSpeed: { type: String },
  airPressure: { type: String },
}, {
  timestamps: true,
});

const MeasureUnits = mongoose.model('msrUnits', measureUnits);

module.exports = MeasureUnits;
