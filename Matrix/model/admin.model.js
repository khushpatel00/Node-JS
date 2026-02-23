const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    password: String,
    gender: {
        type: String,
        enum: ['Male', 'Female']
    },
    img: String,
    contact: String,
});


const blog = mongoose.Schema({
    title: String,
    description: String,
    Category: String,
    Author: String,
    img: String,
});

module.exports = mongoose.model("Admin", adminSchema);
module.exports = mongoose.model("blog", blog);
