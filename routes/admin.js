const express= require("express")
const router=express.Router();
const adminController=require("../controllers/admin")
router.post('/adduser',adminController.addUser);
router.post('/addtype',adminController.addType);

router.post('/addrawmatrial',adminController.addRowMaterial)
router.get('/removerawmatrial',adminController.removeRowMaterial)
module.exports =router;