const asyncHandler = require("express-async-handler");
const Goal = require("../models/goalModel");
const User = require("../models/userModel");

//@desc Get a goal
//@route GET /api/goals
//@access Private
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.id });
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
    user: req.id,
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

  const user = await User.findById(req.id);

  //Check if user exist
  if (!user) {
    res.status(401);
    throw new Error("User not Found");
  }

  //Check if goal belongs to logged in user

  if (user.id !== goal.user.toString()) {
    res.status(401);
    throw new Error("User not authorized");
  }

  //Check if goal exist
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

  const user = await User.findById(req.id);

  //Check if user exist
  if (!user) {
    res.status(401);
    throw new Error("User not Found");
  }

  //Check if goal belongs to logged in user

  if (user.id !== goal.user.toString()) {
    res.status(401);
    throw new Error("User not authorized");
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
