const { Schema, model } = require('mongoose');

// Create Schema
const UserSchema = new Schema({
  email: {
    type: String,
    lowercase: true,
    required: [true, "can't be blank"],
    match: [/\S+@\S+\.\S+/, 'is invalid'],
    unique: true
  },
  firstName: {
    type: String,
    lowercase: true,
    required: [true, "can`t be blank"]
  },
  lastName: {
    type: String,
    lowercase: true,
    required: [true, "can`t be blank"]
  },
  password: {
    type: String,
    required: [true, "can`t be blank"]
    // HAVE TO ADD PASSWORD VALIDATION
  },
}, {timestamps: true});

const User = model('user', UserSchema);

module.exports = User;
