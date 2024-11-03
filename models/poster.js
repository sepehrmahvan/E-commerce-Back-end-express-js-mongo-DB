const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const posterSchema = new Schema(
    {
        file: {type: String, requireeds: true},
    },
    {timestamps: true}
);

module.exports = mongoose.model("PosterData", posterSchema);
