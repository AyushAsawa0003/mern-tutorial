const asyncHandler = require("express-async-handler");
//@desc Get a goal
//@route GET /api/goals
//@access Private
const getGoals = asyncHandler(async (req, res) => {
  res.status(200).json({ msg: "get all the goals" });
});

//@desc Create a goal
//@route POST /api/goals
//@access Private
const createGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text! ");
  }

  res.status(200).json({ msg: "Goal Created" });
});

//@desc Update a goal
//@route PUT /api/goals/:id
//@access Private
const updateGoal = asyncHandler(async (req, res) => {
  res.status(200).json({ msg: `Goal with ID ${req.params.id} is updated` });
});

//@desc Delete a goal
//@route DELETE /api/goals/:id
//@access Private
const deleteGoal = asyncHandler(async (req, res) => {
  res.status(200).json({ msg: `Goal with ID ${req.params.id} is deleted` });
});

module.exports = {
  getGoals,
  createGoal,
  updateGoal,
  deleteGoal,
});
