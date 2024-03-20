const mongoose = require("mongoose");
let { Schema } = mongoose;

const contactSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  review: {
    type: String,
    required: true,
  },
});

const contact = mongoose.model("contact", contactSchema);
module.exports = contact;
