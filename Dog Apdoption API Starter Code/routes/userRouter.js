const express = require("express");
const {login, registerUser} = require ("../controllers/userController");

const userRouter = express.Router ();

userRouter.route("/register").post (registerUser);
userRouter.route("/login").post (login);

module.exports = userRouter;