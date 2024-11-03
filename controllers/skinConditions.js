const { validationResult } = require("express-validator");
const SkinConditions = require("../models/skinConditions");

// GET skin conditions
exports.getSkinConditions = async (req, res, next) => {
  try {
    const SkinConditionsList = await SkinConditions.find();
    res
      .status(200)
      .json({
        message: "fetched posts successfully",
        skinConditions: SkinConditionsList,
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
    next(error);
  }
};

// POST skin conditions
exports.postSkinConditions = async (req, res, next) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      res
        .status(422)
        .json({ message: "validation faild, your entered data is invalid" });
    }

    const skinConditionBody = req.body.skinCondition;

    // save in database
    const SkinCondition = new SkinConditions({
      skinCondition: skinConditionBody,
    });

    const skinConditionsResult = await SkinCondition.save();

    res.status(200).json({ message: "success", result: skinConditionsResult });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
