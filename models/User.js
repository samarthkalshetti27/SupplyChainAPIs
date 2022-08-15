const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phoneNo: {
    type: Number,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  created: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'Users'
  },
});

const User = mongoose.model('Users', userSchema);

module.exports = User;
