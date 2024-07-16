const express = require("express")
const productrouter = express.Router()
const { AddProduct, getAllProducts, getSingleProduct, updateProduct, deleteProduct, uploadImage } = require("../Controller/ProductController")


productrouter.post("/add-product", AddProduct);
productrouter.get("/get-product", getAllProducts)
productrouter.get("/product/:id", getSingleProduct)
productrouter.patch("/product/:id", updateProduct)
productrouter.delete("/delete-product", deleteProduct)
productrouter.post("/upload-image", uploadImage);


module.exports = productrouter;
