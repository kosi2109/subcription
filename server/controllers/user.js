const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Plan } = require("../models/blogs");

const getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

const getUser = async (req, res) => {
  const { id } = req.params;
  const today = new Date
  if (!req.userId) res.status(401).json("User Not Login");

  const userId = req.userId;
  if (id == userId) {
    var user = await User.findById(id).populate({
      path: "plan",
      populate: {
        path: "plan_type",
        model: "Plan",
      },
    }); 
    
    if (today.getTime() > user.plan.expired_in?.getTime()){
      user = await User.findByIdAndUpdate(id,{plan:{}},{new:true}).populate({
        path: "plan",
        populate: {
          path: "plan_type",
          model: "Plan",
        },
      });
      
    }

    return res.status(200).json({userId: user.id,
      fullName: user.fullName,
      userName: user.userName,
      plan: user.plan.plan_type?.name,});
  }
  return res.status(401).json("You are not Authenticated");
};

const createUser = async (req, res) => {
  const existUser = await User.findOne({ userName: req.body.userName });
  if (existUser) {
    return res.status(409).json({ error: "Username already exists . " });
  }
  const hashPassword = await bcrypt.hash(req.body.password, 10);
  const data = {
    fullName: req.body.fullName,
    userName: req.body.userName,
    password: hashPassword,
  };
  try {
    const user = new User(data);
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json(error);
  }
};

const login = async (req, res) => {
  const userName = req.body.userName;
  const password = req.body.password;
  var plan = "Free";
  const user = await User.findOne({ userName: userName }).populate({
    path: "plan",
    populate: {
      path: "plan_type",
      model: "Plan",
    },
  });

  if (!user) res.status(401).json({ error: "User not exist" });

  if (user.plan.plan_type) {
    plan = user.plan.plan_type.name;
  }

  const checkPass = await bcrypt.compare(password, user.password);

  if (checkPass) {
    const token = jwt.sign(
      {
        userId: user.id,
      },
      "secret",
      { expiresIn: "1d" }
    );
    res
      .status(200)
      .json({
        userId: user.id,
        token: token,
        fullName: user.fullName,
        userName: user.userName,
        plan: plan,
      });
  } else {
    res.status(401).json({ error: "Password Incorrect" });
  }
};

const logout = async (req, res) => {
  const userId = req.body.userId;
  const token = jwt.sign(
    {
      userId: userId,
    },
    "secret",
    { expiresIn: 120 }
  );
  res.json(token);
};

const upgradePlan = async (req, res) => {
  const planId = req.body.planId;
  const month = req.body.month;
  const userId = req.userId;
  var userPlan = 0;
  var now = new Date();
  now.setMonth(now.getMonth() + month);
  const to = now.toLocaleDateString();
  const plan = await Plan.findById(planId);
  try {
    const user = await User.findById(userId).populate({
        path: "plan",
        populate: {
          path: "plan_type",
          model: "Plan",
        },
      });;

    if (user.plan.plan_type.plan_no) {
      userPlan = user.plan.plan_type.plan_no;
    }
    
    if (userPlan >= plan.plan_no) {
      res.status(401).json({ error: "Something Wrong" });
    } else {
      const updateuser = await User.findByIdAndUpdate(
        userId,
        {
          plan: {
            plan_type: planId,
            start_date: Date.now(),
            expired_in: to,
          },
        },
        { new: true }
      ).populate({
        path: "plan",
        populate: {
          path: "plan_type",
          model: "Plan",
        },
      });
      res.status(200).json({ plan: updateuser.plan.plan_type.name });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getUsers, getUser, createUser, login, logout, upgradePlan };
