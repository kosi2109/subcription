const mongoose = require("mongoose")

const planSchema = mongoose.Schema({
    name : String ,
    price : Number,
    detail : String,
    plan_no : Number
})

const blogSchema = mongoose.Schema({
    title : {
        type : String,
    },
    intro : {
        type : String,
    },
    body : {
        type : String,
    },
    plan : {
        type : mongoose.Types.ObjectId,
        ref : "Plan",
        required : false
    },
    publish_date : {
        type : Date,
        default : Date.now()
    }
})



const Blog = mongoose.model("Blog",blogSchema)
const Plan = mongoose.model("Plan",planSchema)

module.exports = {Blog,Plan}