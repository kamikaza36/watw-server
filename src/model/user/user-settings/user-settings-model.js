const mongoose = require('mongoose');

const { Schema } = mongoose;
const Location = require('./location-settings/location-settings-model').schema;
const MeasureUnits = require('./measure-units-settings/measure-units-settings-model').schema;
const EmailSettings = require('./email-settings/email-settings-model').schema;

const userSettings = new Schema({
  emailSettings: { type: EmailSettings },
  locationSettings: { type: Location },
  measureUnits: { type: MeasureUnits },
  // Text in mail, what kind of text etc.
}, {
  timestamps: true,
});

const UserSettings = mongoose.model('userStg', userSettings);

module.exports = UserSettings;
