//*can be used like this too
// const express = require("express")
// const authRouter = express.Router()

const {Router} = require("express")
const authController = require("../controllers/auth.controller")
const authMiddleware = require("../middlewares/auth.middleware")

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

/**
 * @route GET /api/auth/get-me
 * @desc get details of user logged in
 * @access private
 */
authRouter.get("/get-me", authMiddleware, authController.getMe)

/**
 * @route POST /api/auth/logout
 * @desc logout a user
 * @access private
 */
authRouter.post("/logout", authMiddleware, authController.logoutUser)

module.exports = authRouter