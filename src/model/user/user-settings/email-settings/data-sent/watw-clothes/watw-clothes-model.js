const mongoose = require('mongoose');

const { Schema } = mongoose;

const watwClothesSchema = new Schema({
  hat: { type: String },
  scarf: { type: String },
  jacket: { type: String },
}, {
  timestamps: true,
});

const WatwClothes = mongoose.model('watwClths', watwClothesSchema);

module.exports = WatwClothes;
