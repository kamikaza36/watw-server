const mongoose = require('mongoose');

const { Schema } = mongoose;
const UserSettings = require('./user-settings/user-settings-model').schema;

const userSchema = new Schema({
  email: {
    type: String, unique: true, required: true, dropDups: true,
  },
  password: {
    type: String, required: true,
  },
  aUserId: {
    type: Number, unique: true, required: true, dropDups: true,
  },
  userSettings: {
    type: UserSettings,
  },
}, {
  timestamps: true,
});

const User = mongoose.model('user', userSchema);

module.exports = User;
