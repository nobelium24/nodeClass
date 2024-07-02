const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({
        productName: {type: String, required: [ true, "Product Name is required"]},
        productPrice: {type: Number, required: [ true, "Product Price is required"]},
        productDescription: {type: String, required: [ true, "Product Description is required"]},
        productBrand: {type: String, required: [ true, "Product Brand is required"]}
})

const productModel = mongoose.model("ProductCollection", ProductSchema);

module.exports = productModel;