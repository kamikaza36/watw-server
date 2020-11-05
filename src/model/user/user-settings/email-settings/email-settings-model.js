const mongoose = require('mongoose');

const { Schema } = mongoose;
const DataSent = require('./data-sent/data-sent-model').schema;

const emailSettingsSchema = new Schema({
  sendAtTime: { type: String },
  timezone: { type: String },
  dataSent: { type: DataSent },
  mailToSendTo: { type: String },
}, {
  timestamps: true,
});

const EmailSettings = mongoose.model('emailStg', emailSettingsSchema);

module.exports = EmailSettings;
