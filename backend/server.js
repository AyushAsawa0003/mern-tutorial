const express = require("express");
const dotenv = require("dotenv").config();
const colors = require("colors");
const connectDB = require("./config/db");

//Init express
const app = express();

//Setting Up middleware for the body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connectDB();

//Init Goal Rouet
const goalRoute = require("./routes/goalRoutes");

//Error Handler Middleware
const { errorHandler } = require("./middlewares/errorMiddleware");

//setting the port
const PORT = process.env.PORT || 3000;

//Router for Goal Controller
app.use("/api/goals", goalRoute);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server runnnig on PORT ${PORT}`);
});
