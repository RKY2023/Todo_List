const path = require("path");
const express = require("express");

require('dotenv').config();

// const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const todoRoutes = require("./routes/todoRoutes");
const app = express();

// const mongodbC = require('./test');
// mongodbC.run();

const port = 3001;

app.use(bodyParser.json());

// models

// routes
app.use("/todos", todoRoutes);

const WelcomeToExpress = (req, res) => {
    res.send("Express on Vercel");
  };

app.get("/", WelcomeToExpress);

app.listen(port, () => console.log(`Server ready on port ${port}.`));

module.exports = app;