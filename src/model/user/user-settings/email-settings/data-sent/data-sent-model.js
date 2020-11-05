const mongoose = require('mongoose');

const { Schema } = mongoose;
const WeatherConditions = require('./weather-conditions/weather-conditions-model').schema;
const WatwClothes = require('./watw-clothes/watw-clothes-model').schema;

const dataSentSchema = new Schema({
  weatherConditions: { type: WeatherConditions },
  watwClothes: { type: WatwClothes },
  joke: { type: Boolean },
  inspiration: { type: Boolean },
}, {
  timestamps: true,
});

const DataSent = mongoose.model('dataSent', dataSentSchema);

module.exports = DataSent;
