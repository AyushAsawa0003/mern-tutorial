const express = require("express");
const router = express.Router();

const {
  getGoals,
  createGoal,
  updateGoal,
  deleteGoal,
} = require("../controllers/goalController");

const auth = require("../middlewares/authMiddleware");

//Get  or Create Goals route
router.route("/").get(auth, getGoals).post(auth, createGoal);

//update or delete Goal route
router.route("/:id").put(auth, updateGoal).delete(auth, deleteGoal);

module.exports = router;
