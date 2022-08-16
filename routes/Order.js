const express = require("express");
const router = express.Router();
const orderController = require("../controllers/Order");
router.post("/addorder", orderController.addOrder);
router.get("/updateStatus", orderController.updateStatus);
router.get("/getorders", orderController.getOrders);
module.exports = router;
