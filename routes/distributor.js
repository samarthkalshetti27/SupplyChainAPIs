const express = require("express");
const router = express.Router();
const distController = require("../controllers/distributor");
router.post("/addorder", distController.addOrder);
router.get("/getnormalorder", distController.getNormalOrder);
router.get("/getregularorder", distController.getRegularOrder);
router.get("/getdistributortransaction", distController.getTransactions);
router.get("/approvenormalorder", distController.approveNormalOrder);
router.get("/approveregularorder", distController.approveRegularOrder);


module.exports = router;
