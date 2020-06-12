const mongoose = require("mongoose");

const noteSchema = mongoose.Schema(
  {
    userId: { type: String, required: true },
    title: { type: String, required: false },
    content: { type: String, required: true },
    pinned: { type: Boolean, required: true },
    color: { type: String, required: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Note", noteSchema);
