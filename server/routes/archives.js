const express = require("express");
const Archive = require("../models/archive");

const router = express.Router();

router.post("/add", (req, res, next) => {
  const archive = new Archive({
    userId: req.body.userId,
    title: req.body.title,
    content: req.body.content,
    pinned: req.body.pinned,
    color: req.body.color,
  });
  archive
    .save()
    .then(() => {
      res.status(201).json({
        message: "archive added successfully",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
});

router.delete("remove", (req, res, next) => {
  Archive.findOneAndDelete({ content: req.content.body }).then(() => {
    res
      .status(201)
      .json({
        message: "note deleted successfully",
      })
      .catch((error) => {
        res.status(401).json({
          error: error,
        });
      });
  });
});

router.get("getall", (req, res, next) => {
  Archive.find()
    .then((notes) => {
      res.status(201).json({
        notes: notes,
      });
    })
    .catch((error) => {
      res.status(201).json({
        error: error,
      });
    });
});
