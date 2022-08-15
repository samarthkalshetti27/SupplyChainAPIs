const mongoose = require("mongoose");

const RowMaterail = mongoose.model(
  "RowMaterials",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    unit: {
      type: String,
      required: true,
    },
  })
);

module.exports = RowMaterail;
