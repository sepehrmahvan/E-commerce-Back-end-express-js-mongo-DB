const { validationResult } = require("express-validator");
const Category = require("../models/category");

// GET categories
exports.getCategories = async (req,res,next) => {
    try{
        const categoryList = await Category.find();
        res.status(200).json({message: "fetched category successfully", categories: categoryList})
    } catch(error){
        res.status(500).json({message: error.message});
        next(error);
    }
}

// POST categories
exports.postCategories = async(req, res, next) => {
    try{
        // validation result 
        const error = validationResult(req);
        if(!error.isEmpty()){
            res.status(422).json({message: "you entered data is invalid"});
        }

        const categoryTitle = req.body.category;

        // save in data base
        const category = new Category({
            category: categoryTitle
        })
        const categoryResult = await category.save();
        
        res.status(200).json({message: "category created", category: categoryResult})
    } catch(error){
        res.status(500).json({message: "Error: " + error.message})
    }
}