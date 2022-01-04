const { Blog, Plan } = require("../models/blogs");
const User = require("../models/user");

const getBlogs = async (req, res) => {
  const {page} = req.query
  try{
    const LIMIT = 8
    const startIndex = (Number(page)-1) * LIMIT
    const total = await Blog.countDocuments({})
    const blogs = await Blog.find({}).select("-body").populate("plan").sort({_id:-1}).limit(LIMIT).skip(startIndex);

    return res.status(200).json({data:blogs,currentPage:Number(page),numberOfPages:Math.ceil(total / LIMIT)})
  }catch(e){
    console.log(e);
  }
  
};

const createBlog = async (req, res) => {
  const data = {
    title: req.body.title,
    intro: req.body.intro,
    body: req.body.body,
    plan: req.body.plan,
  };

  try {
    const blog = new Blog(data);
    await blog.save();
    return res.json(blog);
  } catch (error) {
    return res.json(error);
  }
};

const getBlog = async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.findById(id).populate("plan");
 
  if (!blog) res.status(404).send("Blog Not Found");

  const user = await User.findById(req.userId).populate({ 
    path: 'plan',
    populate: {
      path: 'plan_type',
      model: 'Plan'
    } 
 })

  let userPlan = 0;
  if (user) {
    if (user.isAdmin){
      return res.status(200).json(blog);
    }else if (user.plan.plan_type) {
      userPlan = user.plan.plan_type.plan_no;
    }
  }

  if (userPlan < blog.plan.plan_no){

    return res.status(401).json("You Are Not Authenticate");
  }

  return res.status(200).json(blog);
};

module.exports = { getBlogs, createBlog, getBlog };
