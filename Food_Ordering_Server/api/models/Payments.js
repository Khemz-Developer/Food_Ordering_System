const e = require("express");
const mongoose = require("mongoose"); // import mongoose

const Schema = mongoose.Schema; // import Schema from mongoose

const paymentSchema = new Schema({
    transitionId: String,
    email: String,
    price: Number,
    createdAt: {
        type: Date,
        default: Date.now
    },
    status: String,
    menuItems:Array,
    itemName:Array,
    cartItems:Array,
    quantity:Number

})
const Payment = mongoose.model("Payment", paymentSchema); // create a model from the schema
module.exports = Payment; // export the model