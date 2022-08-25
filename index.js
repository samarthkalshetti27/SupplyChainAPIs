const express = require("express");
const port = 3000;
const db = require("./config/mongoose");
const cors = require("cors");
const app = express();
const path = require("path");
app.use(
  cors({
    origin: "*",
  })
);
app.use("/img", express.static(path.join(__dirname, "uploads")));
app.use(express.json());

app.use("/", require("./routes"));

app.listen(port, (err, data) => {
  if (err) {
    console.error(err);
  } else console.log(port);
});
