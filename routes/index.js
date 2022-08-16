const express = require("express");
const Types = require("../models/Types");

const router = express.Router();

router.use("/users", require("./users"));
router.use("/admin", require("./admin"));

module.exports = router;
