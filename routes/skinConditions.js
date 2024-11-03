const express = require('express');

const { body } = require("express-validator");

const skinConditionsController = require("../controllers/skinConditions");

const router = express.Router();

router.get("/skin-conditions", skinConditionsController.getSkinConditions);

router.post("/skin-conditions", [body("skinCondition").trim().notEmpty()] ,skinConditionsController.postSkinConditions);

module.exports = router;