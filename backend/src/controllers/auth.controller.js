const userModel = require("../models/user.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const blacklistModel = require("../models/blacklist.model")
const redis = require("../config/cache")

const registerUser = async(req, res)=>{
    const {username, email, password} = req.body

    const isUserAlreadyExists = await userModel.findOne({
        $or:[
            { email} ,
            { username }
        ]
    })
    if(isUserAlreadyExists){
        return res.status(400).json({
            message:"User already exists with same email/username"
        })
    }

    const hashedPassword =  await bcrypt.hash(password, 10)

    const user = await userModel.create({
        username,
        email,
        password: hashedPassword
    })

    const token = jwt.sign({
        id: user._id,
        username: user.username
    }, 
        process.env.JWT_SECRET, {expiresIn: "3d"}
    )
    res.cookie("token", token)

    res.status(201).json({
        message:"User registered successfully.",
        user:{
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}

const loginUser = async(req, res)=>{
    const {username, email, password} = req.body

    const user = await userModel.findOne({
        $or: [
            {email},
            {username}
        ]
    }).select("+password")
    if(!user){
        return res.status(400).json({
            message:"Invalid credentials."
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if(!isPasswordValid){
        return res.status(400).json({
            message: "Invalid credentials."
        })
    }

    const token = jwt.sign({
        id: user._id,
        username: user.username
    }, 
        process.env.JWT_SECRET, {expiresIn: "3d"}
    )
    res.cookie("token", token)

    res.status(200).json({
        message:"User logged in successfully.",
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
        }
    })
}

const getMe = async(req, res)=>{
    const userData = await userModel.findById(req.user.id)

    res.status(200).json({
        message:"User details fetched successfully.",
        userData
    })
}

const logoutUser = async(req, res)=>{
    const token = req.cookies.token

    res.clearCookie("token")

    //using redis to save blacklisted tokens with an expiry time same as token expiry time 
    await redis.set(token, Date.now().toString(), "EX", 3*24*60*60)

    res.status(200).json({
        message:"User logout successfully."
    })
}

module.exports = {
    registerUser,
    loginUser,
    getMe,
    logoutUser,
}