const express = require("express");
const Types = require("../models/Types");

const router = express.Router();

router.use("/users", require("./users"));
router.use("/admin", require("./admin"));
router.use("/warehouse", require("./warehouse"));
router.use("/order", require("./Order"));
router.use("/production", require("./production"));
router.use("/distributor", require("./distributor"));

module.exports = router;
