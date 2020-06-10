const express = require("express");
const Note = require("../models/note");

const router = express.Router();
const auth = require("../middleware/auth");

router.post("/addnote", auth, (req, res, next) => {
  const note = new Note({
    title: req.body.title,
    content: req.body.content,
    pinned: req.body.pinned,
    color: req.body.color,
  });
  note
    .save()
    .then(() => {
      res.status(201).json({
        message: "post saved successfully",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
});

router.get("/getone", auth, (req, res, next) => {
  Note.findOne({ content: req.body.content })
    .then((thing) => {
      res.status(200).json(thing);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
});

router.put("/update/:id", auth, (req, res, next) => {
  const note = new Note({
    _id: req.params.id,
    title: req.body.title,
    content: req.body.content,
    pinned: req.body.pinned,
    color: req.body.color,
  });
  Note.updateOne({ _id: req.params.id }, note)
    .then(
      res.status(201).json({
        message: "Note updated successfully",
      })
    )
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
});

router.delete("/deletenote", auth, (req, res, next) => {
  Note.findOneAndRemove({ content: req.body.content })
    .then(() => {
      res.status(200).json({
        message: "Deleted!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
});

router.get("/getall", auth, (req, res, next) => {
  Note.find()
    .then((notes) => {
      res.status(201).json(notes);
    })
    .catch((error) => {
      res.status(400).json({ error: error });
    });
});

module.exports = router;