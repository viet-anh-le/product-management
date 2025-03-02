const express = require('express')
const multer = require("multer");
const router = express.Router();

const controller = require("../../controllers/admin/product-category.controller");
const validate = require("../../validates/admin/product-category.validate")
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");

const upload = multer();


router.get('/', controller.index);

router.get('/create', controller.create);

router.post('/create',
  upload.single("thumbnail"),
  uploadCloud.upload,
  validate.createPost,
  controller.createPost
);

router.post('/upload-image',
  upload.single("thumbnail"),
  uploadCloud.upload,
  (req, res) => {
    res.json({ location: req.body.thumbnail }); // Trả về URL ảnh cho TinyMCE
  }
);

module.exports = router