const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const noteRoutes = require("./routes/notes");
const userRoutes = require("./routes/users");
const archiveRoutes = require("./routes/archives");

const app = express();

mongoose
  .connect(
    "mongodb+srv://adeleye:tkqln2dXSan319vM@cluster0-vm00c.mongodb.net/<dbname>?retryWrites=true&w=majority",
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

//user
app.use("/api/auth", userRoutes);

//notes
app.use("/api/notes", noteRoutes);
app.use("/api/archive", archiveRoutes);

module.exports = app;
