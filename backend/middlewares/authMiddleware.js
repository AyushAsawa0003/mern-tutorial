const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const { log } = require("console");

const auth = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from the header
      token = req.headers.authorization.split(" ")[1];

      //Verify token from the header
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      //Get User from db and add user id to request body which will be used to //get all the goals
      req.id = decoded.id;

      // move to next bit
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Autherization failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Invalid token, Autherization failed");
  }
});

module.exports = auth;
