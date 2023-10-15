const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subcategorySchema = new Schema({
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
  },
  category_id: {
    type: String,
    required: true
  }
}, { strict: false, timestamps: true });


module.exports = mongoose.model("subcategory", subcategorySchema);
