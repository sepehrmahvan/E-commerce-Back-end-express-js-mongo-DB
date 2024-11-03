const { validationResult } = require("express-validator");
const PosterData = require("../models/poster");

// POST image to poster data
exports.postPoster = async (req, res, next) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      res
        .status(422)
        .json({ message: "validation faild, your entered data is invalid" });
    }

    const file = req.body.file;

    // save in data base
    const poster = new PosterData({
      file: file,
    });

    await poster.save();

    res.status(200).json({ message: "success" });
  } catch (error) {
    res.status(500).json({ message: error.message });
    next(error);
  }
};

exports.getPoster = async (req, res, next) => {
    try{
        const postersList = await PosterData.find();

        res.status(200).json({message: "success", posterData: postersList})
    } catch(error){
        res.status(500).json({message: error.message})
    }
}
