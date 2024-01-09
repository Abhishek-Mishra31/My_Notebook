const mongoose = require("mongoose");
let { Schema } = mongoose;

const NotesSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },

  Title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  tag: {
    type: String,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

const note = mongoose.model("note", NotesSchema);
module.exports = note;
