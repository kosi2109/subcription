const { Blog, Plan } = require("../models/blogs");
const User = require("../models/user");

const getBlogs = async (req, res) => {
  const blogs = await Blog.find().select("-body").populate("plan");
  return res.json(blogs);
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

  const user = await User.findById(req.userId).populate("plan");

  let userPlan = 0;
  if (user) {
    if (user.isAdmin){
      return res.status(200).json(blog);
    }else if (user.plan) {
      userPlan = user.plan.plan_no;
    }
  }

  if (userPlan < blog.plan.plan_no){

    return res.status(401).json("You Are Not Authenticate");
  }

  return res.status(200).json(blog);
};

module.exports = { getBlogs, createBlog, getBlog };
