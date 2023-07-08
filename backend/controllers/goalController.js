const asyncHandler = require("express-async-handler");
const Goal = require("../models/goalModel");

//@desc Get a goal
//@route GET /api/goals
//@access Private
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find();
  res.status(200).json(goals);
});

//@desc Create a goal
//@route POST /api/goals
//@access Private
const createGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text! ");
  }

  const goal = await Goal.create({
    text: req.body.text,
  });

  res.json(goal);
});

//@desc Update a goal
//@route PUT /api/goals/:id
//@access Private
const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  console.log(goal);

  if (!goal) {
    res.send(400);
    throw new Error("Goal not found");
  }

  const updGoal = await Goal.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true }
  );

  console.log(updGoal);

  res.status(200).json(updGoal);
});

//@desc Delete a goal
//@route DELETE /api/goals/:id
//@access Private
const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.send(400);
    throw new Error("Goal not found");
  }

  const delGoal = await Goal.findOneAndDelete({ _id: req.params.id });

  res.status(200).json(delGoal);
});

module.exports = {
  getGoals,
  createGoal,
  updateGoal,
  deleteGoal,
};
