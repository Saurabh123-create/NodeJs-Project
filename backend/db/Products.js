const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProductSchema = new Schema({
  name: String,
  company: String,
  price: Number,
});

module.exports = mongoose.model("Products", ProductSchema);
