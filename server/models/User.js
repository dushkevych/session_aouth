const { Schema, model } = require('mongoose');

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

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
  resetPasswordToken: {
    type: String,
    required: false
},

resetPasswordExpires: {
    type: Date,
    required: false
}
}, {timestamps: true});

// UserSchema.pre('save',  function(next) {
//   const user = this;

//   if (!user.isModified('password')) return next();

//   bcrypt.genSalt(10, function(err, salt) {
//       if (err) return next(err);

//       bcrypt.hash(user.password, salt, function(err, hash) {
//           if (err) return next(err);

//           user.password = hash;
//           next();
//       });
//   });
// });

// UserSchema.methods.comparePassword = function(password) {
//   return bcrypt.compareSync(password, this.password);
// };

// UserSchema.methods.generateJWT = function() {
//   const today = new Date();
//   const expirationDate = new Date(today);
//   expirationDate.setDate(today.getDate() + 60);

//   let payload = {
//       id: this._id,
//       email: this.email,
//       firstName: this.firstName,
//       lastName: this.lastName,
//   };

//   return jwt.sign(payload, process.env.JWT_SECRET, {
//       expiresIn: parseInt(expirationDate.getTime() / 1000, 10)
//   });
// };

// UserSchema.methods.generatePasswordReset = function() {
//   this.resetPasswordToken = crypto.randomBytes(20).toString('hex');
//   this.resetPasswordExpires = Date.now() + 3600000; //expires in an hour
// };

// mongoose.set('useFindAndModify', false);

module.exports = model('Users', UserSchema);