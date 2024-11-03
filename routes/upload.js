const express = require('express');
const upload = require("../middlewares/upload");

const uploadController = require("../controllers/upload");

const router = express.Router();

router.post("/upload-image", upload.single("file"), uploadController.UploadFile);

router.get("/get-images", uploadController.GetImages);

module.exports = router;