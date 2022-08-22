const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin");
const warehouseController= require("../controllers/warehouse")
const RowMaterail = require("../models/RowMaterails");
const productionController= require("../controllers/production")
router.post("/adduser", adminController.addUser);
router.post("/addtype", adminController.addType);

router.post("/addrawmatrial", adminController.addRowMaterial);
router.get("/removerawmatrial", adminController.removeRowMaterial);

router.get("/getall", adminController.getAll);

router.post("/addresource", adminController.addResource);
router.get("/getresource", adminController.getResource);



router.get('/stockhistory',warehouseController.getStockHistory)
router.get('/producthistory',productionController.getProductHistory)

module.exports = router;
