const { Schema, model } = require('mongoose');

// Create Schema
const UserSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "can`t be blank"]
  },
  lastName: {
    type: String,
    required: [true, "can`t be blank"]
  },
  email: {
    type: String,
    lowercase: true,
    required: [true, "can't be blank"],
    match: [/\S+@\S+\.\S+/, 'is invalid'],
    unique: true
  },
  password: {
    type: String,
    required: [true, "can`t be blank"]
    // HAVE TO ADD PASSWORD VALIDATION
  },
  googleId: {
    type: String,
    required: false
  }
}, {timestamps: true});

module.exports = model('Users', UserSchema);