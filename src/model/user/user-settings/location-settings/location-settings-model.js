const mongoose = require('mongoose');

const { Schema } = mongoose;
const WeatherStation = require('./weather-station/weather-station-model').schema;

const location = new Schema({
  prefferedCity: { type: String },
  prefferedCoordinates: {
    type: [Number],
    required: true,
  },
  weatherStation: { type: WeatherStation },
}, {
  timestamps: true,
});

const Location = mongoose.model('loc', location);

module.exports = Location;
