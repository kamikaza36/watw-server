const mongoose = require('mongoose');

const { Schema } = mongoose;

const weatherConditionsSchema = new Schema({
  temp: { type: Boolean },
  windSpeed: { type: Boolean },
  realFeel: { type: Boolean },
  airPressure: { type: Boolean },
  humidity: { type: Boolean },
  visibility: { type: Boolean },
  general: { type: Boolean },
}, {
  timestamps: true,
});

const WeatherConditions = mongoose.model('wthrCond', weatherConditionsSchema);

module.exports = WeatherConditions;
