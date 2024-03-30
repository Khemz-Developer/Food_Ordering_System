const mongoose = require("mongoose"); // import mongoose
const Schema = mongoose.Schema; // import Schema from mongoose

const menuSchema = new Schema({
    name:{
        type: String,
        required: true,
        trim:true,
        minlength:3
    },
    recipe:String,
    image:String,
    category:String,
    price:Number,

    })

const Menu = mongoose.model("Menu", menuSchema); // create a model from the schema

module.exports = Menu; // export the model