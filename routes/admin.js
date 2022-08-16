const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin");
const RowMaterail = require("../models/RowMaterails");

router.post("/adduser", adminController.addUser);
router.post("/addtype", adminController.addType);

router.post("/addrawmatrial", adminController.addRowMaterial);
router.get("/removerawmatrial", adminController.removeRowMaterial);

router.get("/getall", adminController.getAll);

router.post("/addresource", adminController.addResource);
router.get("/getresource", adminController.getResource);

module.exports = router;
