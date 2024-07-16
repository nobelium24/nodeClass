const userModel = require("../models/UserSchema");
const UserModel = require("../models/UserSchema");
const argon2 = require('argon2');
const { generateToken, verifyToken } = require("../services/sessionServices");
const { sendMail } = require("../services/mailerService");

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

    const hashedPassword = await argon2.hash(Password);

    console.log(hashedPassword);

    const createUser = await UserModel.create({
      firstName,
      lastName,
      Email,
      Password: hashedPassword,
    });

    if (createUser) {
      await sendMail(Email, firstName, "signup")
      res.status(200).send({ message: "Account Created Successfully" });
    } else {
      res.status(400).send({ message: "Error Creating  Account" });
    }
  } catch (error) {
    console.log("Error saving User Info :", error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

const logIn = async (req, res) => {
  try {
    const { Email, password, userType } = req.body;
    const user = await userModel.findOne({ Email });
    if (!user) return res.status(404).send({ message: "User not found" });

    const hashedPassword = user.Password;
    const verifyPassword = await argon2.verify(hashedPassword, password)
    if (!verifyPassword) return res.status(403).send({ message: "Unauthorized." });

    const token = generateToken(Email, userType);

    return res.status(200).send({ message: `Welcome ${user.firstName}`, token });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: " Internal server error" })
  }
}

const verifyTokenTwo = async (req, res) => {
  try {
    const getToken = req.headers.authorization;
    const token = getToken.split(" ")[1];
    const payload = verifyToken(token);
    const email = payload.email;
    const userType = payload.userType
    if(userType === 'USER') return res.status(200).send({message:`USer with email ${email} is a user`})
    else{
      return res.status(200).send({message:`USer with email ${email} is an admin`});
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: " Internal server error" })
  }
}


const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find({});
    return res.status(200).send(users)
  } catch (error) {
    return res.status(500).send({ message: "Internal server error" })
  }
}

const getSingleUser = async (req, res) => {
  try {
    const { id } = req.params
    const user = await UserModel.findById(id)
    if (!user) return res.status(404).send({ message: "User not found" })
    return res.status(200).send({ message: "User found", user })
  } catch (error) {
    return res.status(500).send({ message: "Internal server error" })
  }
}


const updateUser = async (req, res) => {
  try {
    const { id } = req.params
    const user = req.body
    const updateUser = await UserModel.findOneAndUpdate({ _id: id }, user)
    if (!updateUser) return res.status(500).send({ message: "Error updating User" })
    return res.status(200).send({ message: "User Updated", updateUser })
  } catch (error) {
    return res.status(500).send({ message: "Internal server error" })
  }
}


const deleteUser = async (req, res) => {
  try {
    const { Email } = req.body
    const deleteUser = await UserModel.deleteOne({ Email })
    console.log(deleteUser);
    return res.status(204).send({ message: "test" })
  } catch (error) {
    return res.status(500).send({ message: "Internal server error" })
  }
}


module.exports = { SignUp, getAllUsers, getSingleUser, updateUser, deleteUser, logIn, verifyTokenTwo };