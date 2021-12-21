const { Blog, Plan } = require("../models/blogs");
const User = require("../models/user");

const getBlogs = async (req, res) => {
  const blogs = await Blog.find().select("-body").populate("plan");
  res.json(blogs);
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
    res.json(blog);
  } catch (error) {
    res.json(error);
  }
};

const getBlog = async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.findById(id).populate("plan");

  if (!blog) res.status(404).send("Blog Not Found");

  const user = await User.findById(req.userId).populate("plan");

  let userPlan = 0;
  if (user) {
    if (user.plan) {
      userPlan = user.plan.plan_no;
    }
  }

  if (userPlan < blog.plan.plan_no)
    res.status(401).send("You Are Not Authenticate");

  res.status(200).send(blog);
};

module.exports = { getBlogs, createBlog, getBlog };
