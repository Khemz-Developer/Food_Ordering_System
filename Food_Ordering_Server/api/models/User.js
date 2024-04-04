const mongoose = require("mongoose"); // import mongoose
const Schema = mongoose.Schema; // import Schema from mongoose

// create a new Schema
const userSchema = new Schema({
    name:{
        type : String,
    },
    email:{
        type : String,
        trim:true,
        minlength:3,
    },
    photoUrl:{
        type : String,
    },
    role:{
        type : String,
        enum: ['user', 'admin'],
        default: 'user',
    },
})

// create a model from the schema
const User = mongoose.model("User", userSchema);

module.exports = User; // export the model

