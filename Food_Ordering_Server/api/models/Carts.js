const mongoose  = require('mongoose');

const Schema = mongoose.Schema;

const cartSchema = new Schema({
    menuItemId:String,
    name:{
        type: String,
        required: true,
        trim:true,
        minlength:3
    },
    recipe:String,
    image:String,
    price:Number,
    quantity:Number,
    email:{
        type: String,
        required: true,
        trim:true,
       
    }
    
})

const Carts = mongoose.model('Cart',cartSchema);

module.exports = Carts;