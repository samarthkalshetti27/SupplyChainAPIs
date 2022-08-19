const mongoose = require("mongoose");

const stockHistorySchema = new mongoose.Schema({
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
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
});

const StockHistory = mongoose.model("StockHistory", stockHistorySchema);

module.exports = StockHistory;
