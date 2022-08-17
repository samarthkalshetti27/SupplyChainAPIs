const mongoose = require("mongoose");

const materialSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "RowMaterials",
    required: true,
  },
  qty: {
    type: Number,
    required: true,
  },
});


const productSchema = new mongoose.Schema({

})