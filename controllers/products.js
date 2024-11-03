const { validationResult } = require("express-validator");
const Products = require("../models/products");
require("dotenv").config();

// Create Product
exports.postProduct = async (req, res, next) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      res
        .status(422)
        .json({ message: "validation faild, your entered data is invalid" });
    }

    const name = req.body.name;
    const productcode = req.body.productcode;
    const description = req.body.description;
    const category = req.body.category;
    const skinCondition= req.body.skinCondition;
    const image = req.body.image;
    const price = req.body.price;
    const inventory = req.body.inventory;
    const otherimages = req.body.otherimages;
    const howtoapply = req.body.howtoapply;
    const ingredient = req.body.ingredient;
    const advance = req.body.advance;
    const specification = req.body.specification;

    // save in database
    const product = new Products({
      name: name,
      productcode: productcode,
      description: description,
      category: category,
      skinCondition: skinCondition,
      image: image,
      price: price,
      inventory: inventory,
      otherimages: otherimages,
      howtoapply: howtoapply,
      ingredient: ingredient,
      advance: advance,
      specification: specification,
    });

    await product.save();

    res.status(200).json({ message: "success"});
  } catch (error) {
    res.status(500).json({ message: error.message });
    next(error);
  }
};

// GET Products
exports.getProducts = async (req, res, next) => {
    try{
        const products = await Products.find();
        res.status(200).json({message: "success", products: products});
    } catch(error){
        res.status(500).json({message: error.message});
        next(error);
    }
}

// GET one product
exports.getProduct = async (req, res, next) => {
    try{
        const productId = req.params.productId;
        const product = await Products.findById(productId);

        if(!product){
            res.status(404).json({message: 'Product not found'});
        }

        res.status(200).json({message: "success" , product: product});
    } catch(error){
        res.status(500).json({message: error.message});
        next(error);
    }
}