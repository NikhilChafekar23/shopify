const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true }, // Add "required" and "unique"
  email: { type: String, required: true, unique: true }, // Email should also be unique
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
