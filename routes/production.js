const express = require("express");
const router = express.Router();
const productionController = require("../controllers/production");
router.post("/addstock", productionController.addStock);
router.get("/getstock", productionController.getStock);
router.post("/updatemaxsize", productionController.updateMaxSize);
router.post("/makeproduct", productionController.makeProduct);
module.exports = router;
