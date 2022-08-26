const express = require("express");
const userController = require("../controllers/user");
const router = express.Router();
const fileStorage = require("../middleware/fileStorage");
const farmerController = require("../controllers/farmer");
router.post("/login", userController.login);
router.post("/addpost", farmerController.addPost);
router.get("/getpost", farmerController.getPost);
router.get("/getmypost", farmerController.getMyPost);

router.post('/book',farmerController.book);
router.get('/collect',farmerController.collect);


module.exports = router;
