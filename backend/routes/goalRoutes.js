const express = require("express");
const router = express.Router();

const {
  getGoals,
  createGoal,
  updateGoal,
  deleteGoal,
} = require("../controllers/goalController");

//Get  or Create Goals route
router.route("/").get(getGoals).post(createGoal);

//update or delete Goal route
router.route("/:id").put(updateGoal).delete(deleteGoal);

module.exports = router;
