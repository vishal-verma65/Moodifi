const blacklistModel = require("../models/blacklist.model")
const userModel = require("../models/user.model")
const redis = require("../config/cache")
const jwt = require("jsonwebtoken")

const authUser = async(req, res, next)=>{
    const token = req.cookies.token
    if(!token){
        return res.status(401).json({
            message:"Token not provided."
        })
    }

    //using redis to check if token is blacklisted or not, if blacklisted then we can directly return without querying the database
    const isTokenBlacklisted = await redis.get(token)
    if(isTokenBlacklisted){
        return res.status(401).json({
            message:"Invalid token."
        })
    }

    try{    
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET,  
        )
        req.user = decoded
        next();
    }
    catch(err){
        return res.status(401).json({
            message:"Invalid or expired token."
        })
    }
}

module.exports = authUser

