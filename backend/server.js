const express = require("express");
const employeeRoute = require("./routes/employee");
const userRoute = require("./routes/user");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const db = require("./db");
const path = require('path')
db();

const app = express();

const cors = require("cors");
app.use(cors());

const PORT = process.env.PORT || 8002;

app.use(express.json());

app.use((req, res, next) => {
  console.log(`${Date()}-${req.method}-${req.url}`);
  next();
});

app.use("/api/v1/emp", employeeRoute);
app.use("/api/v1/user", userRoute);

app.use(express.static(path.join(__dirname, '../frontend/build')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend', 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}...`);
});
