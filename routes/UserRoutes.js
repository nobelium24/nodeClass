const express = require("express");
const router = express.Router();
const {
    SignUp, getAllUsers, getSingleUser,
    updateUser, deleteUser, logIn,
    verifyTokenTwo
} = require("../Controller/UserController");

router.post("/sign-up", SignUp);
router.get("/all-users", getAllUsers)
router.get("/user/:id", getSingleUser)
router.patch("/user/:id", updateUser)
router.delete("/user", deleteUser)
router.post("/login", logIn);
router.get("/verify", verifyTokenTwo);



module.exports = router;