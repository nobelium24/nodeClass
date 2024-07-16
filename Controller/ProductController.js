const productModel = require("../models/ProductSchema");
const cloudinaryConfig = require("../config/cloudinaryConfig");

const AddProduct = async (req, res) => {
  const { productName, productPrice, productDescription, productBrand, image } =
    req.body;
  if (!productName || !productPrice || !productDescription || !productBrand) {
    return res.status(400).send({ message: "All fields are required" });
  }

  try {
    const checkProduct = await productModel.findOne({ productName });
    if (checkProduct) {
      return res.status(400).send({ message: "Product already exist" });
    }

    const imageUpload = await cloudinaryConfig.uploader.upload(image);
    const { public_id, secure_url } = imageUpload;
    const newImage = {
      public_id,
      secure_url,
    };

    const createProduct = await productModel.create({
      productName,
      productPrice,
      productDescription,
      productBrand,
      image: newImage,
    });
    if (createProduct) {
      res.status(200).send({ message: "Product added successfully" });
    } else {
      res.status(400).send({ message: "Error adding product" });
    }
  } catch (error) {
    console.log("Error saving Product Info :", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const product = await productModel.find({});
    return res.status(200).send(product);
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

const getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productModel.findById(id);
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    } else {
      return res.status(200).send({ message: "Product found", product });
    }
  } catch (error) {
    return res.status(500).send({ message: "Internal server error" });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.body)
    const {productName, productDescription, productBrand, productPrice} = req.body;
    const newProduct = {
      productName,
      productPrice,
      productDescription,
      productBrand,
    };
    const updateProduct = await productModel.findOneAndUpdate(
      { _id: id },
      newProduct
    );
    if (!updateProduct)
      return res.status(500).send({ message: "Error updating Product" });
    return res.status(200).send({ message: "Product Updated", updateProduct });
  } catch (error) {
    return res.status(500).send({ message: "Internal server error" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.query;
    const product = await productModel.findById(id);
    if (!product) return res.status(404).send({ message: "Product not found" });

    const image = product.image;
    const { public_id } = image;
    await cloudinaryConfig.uploader.destroy(public_id);
    await productModel.deleteOne({ _id: id });
    return res.status(200).send({ message: "Product deleted successfully" });
  } catch (error) {
    return res.status(500).send({ message: "Internal server error" });
  }
};

const uploadImage = async (req, res) => {
  try {
    const { photo } = req.body;

    const uploadImage = await cloudinaryConfig.uploader.upload(photo);
    // const deleteImg = await cloudinaryConfig.uploader.destroy(public_key)
    const secure_url = uploadImage.secure_url;
    const public_id = uploadImage.public_id;
    return res.status(200).send({ secure_url, public_id });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Internal error" });
  }
};

module.exports = {
  AddProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
};
