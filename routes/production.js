const express = require("express");
const router = express.Router();
const productionController = require("../controllers/production");
router.post("/addstock", productionController.addStock);
router.get("/getstock", productionController.getStock);
router.post("/updatemaxsize", productionController.updateMaxSize);
module.exports = router;
