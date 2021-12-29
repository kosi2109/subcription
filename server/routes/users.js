const express = require("express")
const router = express.Router()
const {getUsers,createUser,login,logout,getUser,upgradePlan} = require("../controllers/user")
const checkPlan = require("../middleware/auth")

router.get('/',getUsers)
router.post('/signup',createUser)
router.post("/login",login)
router.post("/logout",logout)
router.post('/upgrade',checkPlan,upgradePlan)
router.get('/:id',checkPlan,getUser)
module.exports = router