const express = require('express');

const productsController = require("../controllers/products");

const router = express.Router();

router.post("/post-product", productsController.postProduct);

router.get("/get-products", productsController.getProducts);

// Get one product
router.get("/products/:productId", productsController.getProduct)

module.exports = router;