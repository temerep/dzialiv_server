const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sliderSchema = new Schema({
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
    required: false
  },
  link: {
    type: String,
    required: false
  }
}, { strict: false, timestamps: true });


module.exports = mongoose.model("slider", sliderSchema);
