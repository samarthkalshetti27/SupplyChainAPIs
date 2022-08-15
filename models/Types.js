const mongoose = require("mongoose");
const typeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  subtype: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref:'types'
    },
  ],
  rowmatrials:[{
      type: mongoose.Schema.Types.ObjectId,
      ref:'RowMaterials',
  }]
});

const Type = mongoose.model("types", typeSchema);

module.exports = Type;
