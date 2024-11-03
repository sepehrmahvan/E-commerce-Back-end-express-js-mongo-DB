const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const skinConditionsSchema = new Schema(
    {
        skinCondition: {type: String, required: true},
    },
    {timestamps: true}
);

module.exports = mongoose.model("SkinConditions", skinConditionsSchema)