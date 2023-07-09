const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { stack } = require("../routes/goalRoutes");

//@desc create/register a new user
//@route POST /appi/users/
//@access Public
const createUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields ");
  }
  //Check if user exist
  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error("User already Exist");
  }

  //Hash Password
  const salt = await bcrypt.genSalt(10);
  const hashedPwd = await bcrypt.hash(password, salt);

  const user = await User.create({
    name: name,
    email: email,
    password: hashedPwd,
  });

  if (user) {
    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      token: generatToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid User data!");
  }
});

//@desc Authenticate a user
//@route POST /appi/users/login
//@access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
      token: generatToken(user._id),
      msg: "User logged-in sucessfully",
    });
  } else {
    res.status(400);
    throw new Error("Invalid User credentials !");
  }
});

//@desc Get user data
//@route GET /appi/users/me
//@access Private
const getMe = asyncHandler(async (req, res) => {
  const { _id, name, email } = await User.findOne({ _id: req.id });
  res.status(200).json({ id: _id, name, email });
});

// Generate JWT token
const generatToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  createUser,
  loginUser,
  getMe,
};
