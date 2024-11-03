const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
require("dotenv").config();

const app = express();

app.use(bodyParser.json());

// CORS Error
app.use((_req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, DELETE, PUT, PATCH"
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
  });

//   routes
const categoryRoute = require("./routes/category");
app.use("/api", categoryRoute);

const skinConditionsRoute = require("./routes/skinConditions");
app.use("/api", skinConditionsRoute);

const uploadRoute = require("./routes/upload");
app.use("/api", uploadRoute);

const productsRoute = require("./routes/products");
app.use("/api", productsRoute);

const posterData = require("./routes/poster");
app.use("/api", posterData);

// how to connect to mongo db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT , () => console.log("server running on port 8080"));
  })
  .catch((err) => {
    console.log(err);
  });
