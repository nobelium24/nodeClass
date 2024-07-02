const express = require("express");
const router = express.Router();
const { SignUp, getAllUsers, getSingleUser, updateUser, deleteUser } = require("../Controller/UserController");

router.post("/sign-up", SignUp);
router.get("/all-users", getAllUsers)
router.get("/user/:id", getSingleUser)
router.patch("/user/:id", updateUser)
router.delete("/user", deleteUser)



module.exports = router;