const mongoose = require("mongoose");

const RowMaterails = mongoose.model(
  "RowMaterials",
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      unit: {
        type: String,
        required: true,
      },
    },
    { timestamps: true }
  )
);

module.exports = RowMaterails;
