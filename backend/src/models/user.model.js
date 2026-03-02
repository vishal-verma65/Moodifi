const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        requires: [true, "Username is required."],
        unique: [true, "Username already exists."]
    },
    email:{
        type: String,
        required: [true, "Email is required."],
        unique: [true, "Email already registered."]
    },
    password:{
        type: String,
        required: [true, "Password is required."],
        select: false
    }
})

//*Task
//userSchema.pre("save", ()=>{})
    //userSchema.post("save", ()=>{})

const userModel = mongoose.model("users", userSchema)

module.exports = userModel

