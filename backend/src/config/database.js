const mongoose = require("mongoose")

const connectToDb =()=>{
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Connected to MongoDb")
    })
    .catch(err => {
        console.log("Error connecting to DB", err)
    })
}

module.exports = connectToDb;