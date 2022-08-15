const mongoose = require("mongoose");

const typeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  subtype: [
    {
      id: mongoose.Schema.Types.ObjectId,
    },
  ],
});

const Type = mongoose.model("types", typeSchema);

module.exports = Type;
