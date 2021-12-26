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
        plan_type:{
            type : mongoose.Types.ObjectId,
            ref : "Plan",
            required : false
        },
        start_date:{
            type : Date,
            default : Date.now()
        },
        expired_in:{
            type : Date
        } 
    },
    isAdmin : {
        type : Boolean,
        default : false
    }
})

const User  = mongoose.model("User",userSchema)

module.exports = User