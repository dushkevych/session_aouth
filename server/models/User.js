const { Schema, model } = require('mongoose');

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
}, {timestamps: true});

const User = model('user', UserSchema);

module.exports = User;
