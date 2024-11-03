const { validationResult } = require("express-validator");
const Upload = require("../models/upload");
require("dotenv").config();
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

exports.UploadFile = async (req, res, _next) => {
  try {
    const error = validationResult(req)
    if (!error.isEmpty()) {
      res
        .status(422)
        .json({ message: "validation faild, your entered data is invalid" });
    }

    // S3 bucket Liara
    const client = new S3Client({
      region: "default",
      endpoint: "https://storage.c2.liara.space",
      credentials: {
        accessKeyId: process.env.LIARA_ACCESS_KEY,
        secretAccessKey: process.env.LIARA_SECRET_KEY,
      },
    });

    const file = req.file;

    if (!file) {
      res.status(401).json({ message: "you need to choose a file" });
    }

    const params = {
      Body: file.buffer,
      Bucket: process.env.LIARA_BUCKET_NAME,
      Key: `${Date.now()}_${file.originalname}`,
    };

    await client.send(new PutObjectCommand(params));

    // making URL for the uploaded file

    const fileUrl = `https://${process.env.LIARA_BUCKET_NAME}.storage.c2.liara.space/${params.Key}`;

    // saving in data base
    const newFile = new Upload({
      file: fileUrl,
    });
    await newFile.save();

    res.status(201).json({
      message: "file uploaded successfully",
      fileUrl,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.GetImages = async (_req, res, _next) => {
  try {
    const imagesList = await Upload.find();
    res.status(200).json({ message: "Images found", imagesList: imagesList });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
