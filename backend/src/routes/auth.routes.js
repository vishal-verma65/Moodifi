//*can be used like this too
// const express = require("express")
// const authRouter = express.Router()

const {Router} = require("express")
const authController = require("../controllers/auth.controller")

const authRouter = Router()

/**
 * @route POST /api/auth/register
 * @desc register a new user
 * @access public
 */
authRouter.post("/register", authController.registerUser)

/**
 * @route POST /api/auth/login
 * @desc login a user
 * @access public
 */
authRouter.post("/login", authController.loginUser)

module.exports = authRouter