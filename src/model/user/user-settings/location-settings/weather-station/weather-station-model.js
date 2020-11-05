const mongoose = require('mongoose');

const { Schema } = mongoose;

const weatherStation = new Schema({
  name: { type: String },
  location: {
    type: [Number],
    required: true,
  },
  altitude: { type: Number },
}, {
  timestamps: true,
});

const WeatherStation = mongoose.model('wthrStat', weatherStation);

module.exports = WeatherStation;
