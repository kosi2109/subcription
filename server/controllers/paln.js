const { Plan } = require("../models/blogs");

const getPlans = async (req, res) => {
  const plan = await Plan.find();
  res.json(plan);
};

const createPlan = async (req, res) => {
  const data = {
    name: req.body.name,
    price: req.body.price,
    detail: req.body.detail,
    plan_no: req.body.plan_no,
  };

  try {
    const plan = new Plan(data);
    await plan.save();
    res.json(plan);
  } catch (e) {
    res.json(e);
  }
};

module.exports = { getPlans, createPlan };
