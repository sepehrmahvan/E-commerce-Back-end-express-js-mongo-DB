const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productsSchema = new Schema(
  {
    name: { type: String, required: true },
    productcode: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    skinCondition: {type: String, required: true},
    price: { type: Number, required: true },
    inventory: { type: Number, required: true },
    otherimages: { type: [String], required: true },
    howtoapply: { type: String, required: true },
    ingredient: { type: String, required: true },
    advance: { type: String, required: true },
    specification: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Products", productsSchema);
