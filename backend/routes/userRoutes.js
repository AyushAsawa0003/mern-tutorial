const express = require("express");
const router = express.Router();

const {
  createUser,
  loginUser,
  getMe,
} = require("../controllers/userController");

const auth = require("../middlewares/authMiddleware");

//Get or Create Users route
router.post("/", createUser);
router.post("/login", loginUser);
router.get("/me", auth, getMe);

module.exports = router;
