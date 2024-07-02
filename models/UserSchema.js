const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: [true, "First Name is required"] },
  lastName: { type: String, required: [true, "Last Name is required"] },
  Email: { type: String, required: [true, "Email is required"], unique: true },
  Password: { type: String, required: [true, "Password is required"] },
});
const userModel = mongoose.model("UsersCollection", UserSchema);

module.exports = userModel;