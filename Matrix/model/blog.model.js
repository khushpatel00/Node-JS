const mongoose = require("mongoose");

const blog = mongoose.Schema({
    title: String,
    description: String,
    Category: String,
    Author: String,
    img: String,
});

module.exports = mongoose.model("blog", blog);
