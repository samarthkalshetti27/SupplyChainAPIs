const express = require("express");
const router = express.Router();
const warehouseController = require("../controllers/warehouse");
router.get("/getstock", warehouseController.getStock);
router.get("/getstockhistory",warehouseController.getStockHistory);
router.post("/addstock", warehouseController.addStock);
router.post("/updatemaxsize", warehouseController.updateMaxSize);

module.exports = router;
