const mongoose = require('mongoose');
const { Schema} = mongoose;
const userSchema = new Schema({
    username : String,
    email : String,
    password : Number,
}, {collection : 'users'})

module.exports = mongoose.model("users", userSchema);