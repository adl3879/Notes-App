//MONBODB PASSWORD Bs4Q1Xix290CAKUs
//USERNAME mongo "mongodb+srv://cluster0-qznba.mongodb.net/test"  --username adlll

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const noteRoutes = require("./routes/notes");
const userRoutes = require("./routes/users");

const app = express();

mongoose
  .connect(
    "mongodb+srv://adlll:Bs4Q1Xix290CAKUs@cluster0-qznba.mongodb.net/test",
    { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Successfully connected to mongoDB Atlas");
  })
  .catch((error) => {
    console.log("Unable to connect to mongoDB Atlas");
  });
  
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(cors());

app.use("/api/notes", noteRoutes);
app.use("/api/auth", userRoutes);

module.exports = app;
