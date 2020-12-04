const { Schema, model } = require('mongoose');

// Create Schema
const sessionSchema = new Schema({
    _id: String,
    expires: Date,
    session: String
}, );

module.exports = model('Session', sessionSchema);