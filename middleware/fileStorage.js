const multer =require('multer');
const shortid=require('shortid');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});

const fileStorage = multer({ storage });
module.exports =fileStorage;
