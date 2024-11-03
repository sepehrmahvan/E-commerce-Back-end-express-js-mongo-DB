const express = require('express');

const { body } = require("express-validator");

const categorycontroller = require("../controllers/category");

const router = express.Router();

// get categories
router.get("/get-categories", categorycontroller.getCategories);

// post categories
router.post("/post-categories", [
    body("category").trim().notEmpty(),
] ,categorycontroller.postCategories);

module.exports = router;