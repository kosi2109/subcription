const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    fullName :{
        type : String,
        required : true
    },
    userName : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    plan :{
        type : mongoose.Types.ObjectId,
        ref : "Plan",
        required : false
    },
    isAdmin : {
        type : Boolean,
        default : false
    }
})

const User  = mongoose.model("User",userSchema)

module.exports = User