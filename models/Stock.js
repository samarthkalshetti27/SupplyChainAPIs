const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "RowMaterials",
    required: true,
  },
  maxSize: {
    type: Number,
    required: true,
  },
  available: {
    type: Number,
    required: true,
  },
});


const Stock = mongoose.model("Stock", stockSchema);

module.exports = Stock;
