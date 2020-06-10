const mongoose = require("mongoose");

const noteSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  pinned: { type: Boolean, required: true },
  color: { type: String, required: false },
});

module.exports = mongoose.model("Note", noteSchema);