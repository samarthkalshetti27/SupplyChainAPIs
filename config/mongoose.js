const mongoose = require("mongoose");
mongoose.connect(
  `mongodb+srv://Farzeen:Farzeen8998@cluster0.cnirj.mongodb.net/BiofuelsDb?retryWrites=true&w=majority`
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

module.exports = db;
