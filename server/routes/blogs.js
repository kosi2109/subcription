const express = require("express")
const router = express.Router()
const {getBlogs,createBlog,getBlog} = require("../controllers/blogs")
const checkPlan = require("../middleware/auth")

router.get('/:id',checkPlan,getBlog)
router.get('/',getBlogs)
router.post('/',createBlog)







module.exports = router