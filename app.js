// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/", authRoutes);

const clientSignupRoutes = require("./routes/client-signup.router")
app.use("/signup", clientSignupRoutes);

const coachSignupRoutes = require("./routes/coach-signup.router")
app.use("/signup", coachSignupRoutes);

const userRoutes = require("./routes/user.routes")
app.use("/", userRoutes);

const coachRoutes = require ("./routes/coach.routes")
app.use("/", coachRoutes);

const exerciseRoute = require ("./routes/exercise.routes")
app.use("/", exerciseRoute);

const subscribeRoutes = require("./routes/subscribe.routes")
app.use("/", subscribeRoutes);

const variationRoutes = require("./routes/variation.routes")
app.use("/", variationRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
