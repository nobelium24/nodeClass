const productModel = require("../models/ProductSchema")

const AddProduct = async (req, res) => {
    const { productName, productPrice, productDescription, productBrand } = req.body
    if (!productName || !productPrice || !productDescription || !productBrand) {
        return res.status(400).send({ message: "All fields are required" });
    }

    try {
        const checkProduct = await productModel.findOne({ productName });
        if (checkProduct) {
            return res.status(400).send({ message: "Product already exist" })
        }

        const createProduct = await productModel.create({
            productName,
            productPrice,
            productDescription,
            productBrand,
        })
        if (createProduct) {
            res.status(200).send({ message: "Product added successfully" })
        } else {
            res.status(400).send({ message: "Error adding product" })
        }
    } catch (error) {
        console.log("Error saving Product Info :", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
}


const getAllProducts = async (req, res) => {
    try {
        const product = await productModel.find({})
        return res.status(200).send(product)
    } catch (error) {
        return res.status(500).send({ message: "Internal Server Error" })
    }
}


const getSingleProduct = async (req, res) => {
    try {
        const { id } = req.params
        const product = await productModel.findById(id)
        if (!product) {
            return res.status(404).send({message: "Product not found"})
        }else{
            return res.status(200).send({message: "Product found", product})
        }
    } catch (error) {
    return res.status(500).send({message: "Internal server error"})
    }
}


const updateProduct = async (req, res) =>{
    try {
      const {id} = req.params
      const product = req.body
      const updateProduct = await productModel.findOneAndUpdate({_id:id}, product)
      if(!updateProduct) return res.status(500).send({message: "Error updating Product"})
        return res.status(200).send({message: "Product Updated", updateProduct})
    } catch (error) {
      return res.status(500).send({message: "Internal server error"})
    }
  }
  
  
  const deleteProduct = async (req, res) =>{
    try {
      const {productName} = req.params
      const deleteProduct = await productModel.deleteOne({productName})
      console.log(deleteProduct);
      return res.status(204).send({message:"test"})
    } catch (error) {
      return res.status(500).send({message: "Internal server error"})
    }
  }


module.exports = { AddProduct, getAllProducts, getSingleProduct, updateProduct, deleteProduct }