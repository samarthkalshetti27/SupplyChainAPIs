const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNo: { type: Number, required: true },
  location: { type: String, required: true },
});

const Resource = mongoose.model("Resource", resourceSchema);

module.exports = Resource;