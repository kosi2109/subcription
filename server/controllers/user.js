const User = require("../models/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const getUsers = async (req,res)=>{
    const users = await User.find()
    res.json(users)
}

const getUser = async (req,res)=>{
    const {id} = req.params
    
    if(!req.userId) res.status(401).json("User Not Login")

    const userId = req.userId
    if (id == userId){
        const users = await User.findById(id).populate("plan")
        return res.json(users)
    }
    return res.status(401).json("You are not Authenticated")
    
}

const createUser = async (req,res)=>{
    const existUser = await User.findOne({userName:req.body.userName})
    if (existUser){
        return res.json({error: "Username already exists . "})
    }
    const hashPassword = await bcrypt.hash(req.body.password,10) 
    const data = {
        fullName : req.body.fullName,
        userName : req.body.userName,
        password : hashPassword,
    }
    try {
        const user = new User(data)
        await user.save()
        res.json(user)
    } catch (error) {
        res.json(error)
    }
}

const login = async (req,res)=>{
    const userName = req.body.userName
    const password = req.body.password
   
    const user  = await User.findOne({userName:userName}).populate("plan")

    if (!user) res.json({error:"User not exist"});

    const checkPass = await bcrypt.compare(password,user.password)

    if(checkPass){
        const token = jwt.sign({
            userId : user.id,
        },"secret",{expiresIn:120});
        res.json({userId:user.id,token:token,fullName : user.fullName,userName : user.userName,plan : user.plan,})

    }else{
        res.json({error : "Password Incorrect"})
    }
    
}

const logout = async (req,res)=>{
    const userId = req.body.userId
    const token = jwt.sign({
        userId : userId,
    },"secret",{expiresIn:120});
    res.json(token)
}


module.exports = {getUsers ,getUser , createUser , login , logout}