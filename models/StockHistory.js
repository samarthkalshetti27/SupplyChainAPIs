const mongoose = require("mongoose");

const stockHistorySchema = new mongoose.Schema(
  {
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    location: {
      type: String,
      enum: ["row", "production"],
    },
    materials: [
      {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "RowMaterials",
        },
        price: {
          type: Number,
          required: true,
        },
        qty: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const StockHistory = mongoose.model("StockHistory", stockHistorySchema);

module.exports = StockHistory;
