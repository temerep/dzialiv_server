const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const serviceSchema = new Schema({
  img: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: false
  },
  category_id: {
    type: String,
    required: false
  }
}, { strict: false, timestamps: true });


module.exports = mongoose.model("service", serviceSchema);
