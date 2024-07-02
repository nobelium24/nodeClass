const UserModel = require("../models/UserSchema");

const SignUp = async (req, res) => {
  const { firstName, lastName, Email, Password } = req.body;
  if (!firstName || !lastName || !Email || !Password) {
    return res.status(400).send({ message: "All fields are required" });
  }

  try {
    const checkUser = await UserModel.findOne({ Email });
    if (checkUser) {
      return res.status(400).send({
        message: "Account Alredy exists, Try logging in to your account",
      });
    }

    const createUser = await UserModel.create({
      firstName,
      lastName,
      Email,
      Password,
    });

    if (createUser) {
      res.status(200).send({ message: "Account Created Successfully" });
    } else {
      res.status(400).send({ message: "Error Creating  Account" });
    }
  } catch (error) {
    console.log("Error saving User Info :", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};


const getAllUsers = async (req, res) =>{
  try {
    const users = await UserModel.find({});
    return res.status(200).send(users)
  } catch (error) {
    return res.status(500).send({message: "Internal server error"})
  }
}

const getSingleUser = async (req, res) =>{
  try {
    const {id} = req.params
    const user = await UserModel.findById(id)
    if(!user) return res.status(404).send({message: "User not found"})
      return res.status(200).send({message: "User found", user})
  } catch (error) {
    return res.status(500).send({message: "Internal server error"})
  }
}


const updateUser = async (req, res) =>{
  try {
    const {id} = req.params
    const user = req.body
    const updateUser = await UserModel.findOneAndUpdate({_id:id}, user)
    if(!updateUser) return res.status(500).send({message: "Error updating User"})
      return res.status(200).send({message: "User Updated", updateUser})
  } catch (error) {
    return res.status(500).send({message: "Internal server error"})
  }
}


const deleteUser = async (req, res) =>{
  try {
    const {Email} = req.body
    const deleteUser = await UserModel.deleteOne({Email})
    console.log(deleteUser);
    return res.status(204).send({message:"test"})
  } catch (error) {
    return res.status(500).send({message: "Internal server error"})
  }
}


module.exports = { SignUp, getAllUsers, getSingleUser, updateUser, deleteUser };