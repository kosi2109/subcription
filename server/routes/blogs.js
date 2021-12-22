const express = require("express")
const router = express.Router()
const {getBlogs,createBlog,getBlog} = require("../controllers/blogs")
const checkPlan = require("../middleware/auth")

router.get('/',getBlogs)
router.post('/',createBlog)
router.get('/:id',checkPlan,getBlog)







module.exports = router