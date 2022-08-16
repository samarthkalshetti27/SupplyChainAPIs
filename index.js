const express = require("express");
const port = 3000;
const db = require("./config/mongoose");
const app = express();


app.use(express.json());
app.use("/", require("./routes"));

app.listen(port, (err, data) => {
  if (err) {
    console.error(err);
  } else console.log(port);
});
