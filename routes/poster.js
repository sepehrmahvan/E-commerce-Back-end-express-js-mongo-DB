const express = require('express');

const { body } = require("express-validator");

const posterController = require("../controllers/poster");

const router = express.Router();

// GET Poster data
router.get("/get-poster-images", posterController.getPoster);

// POST poster images
router.post("/add-to-poster", posterController.postPoster)

module.exports = router;