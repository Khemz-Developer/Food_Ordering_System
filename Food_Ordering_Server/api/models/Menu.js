const mongoose = require("mongoose"); // import mongoose
const { create } = require("./User");
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
    createdAt:{
        type: Date,
        default: Date.now
    } //this is used to store the date the menu item was created, so it helps to render in frontend by newly added item first

    })

const Menu = mongoose.model("Menu", menuSchema); // create a model from the schema

module.exports = Menu; // export the model