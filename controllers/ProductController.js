const uuid = require("uuid");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");
const Product = require("../models/Product");
const cloudinary = require("cloudinary").v2;

const cloudinaryUrl = new URL(process.env.CLOUDINARY_URL);

cloudinary.config({
  cloud_name: cloudinaryUrl.hostname,
  api_key: cloudinaryUrl.username,
  api_secret: cloudinaryUrl.password,
  secure: true,
});


class ProductController {
  async create(req, res) {
    try {
      const { name, desc, link, subcategory_id } = req.body;
      const { img } = req.files || {};

      if (!img || !name || !desc || !link || !subcategory_id) {
        return res.json({ message: "Required fields are not filled"});
      }

      const filename = uuid.v4()
      const imgRes = await cloudinary.uploader.upload(img, {
        resource_type: "image",
        format: "webp",
        quality: "auto",
        flags: "lossy",
        fetch_format: "auto",
        public_id: filename,
      });
      
      const result = await Product.create({ img: imgRes.secure_url, name, desc, link, subcategory_id })
      res.json(result);

    } catch (e) { 
      console.error(e)
    }
  }
  async remove(req, res) {
    try {
      const prodId = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(prodId)) {
        return res.status(404).json({ message: "Invalid prodId" });
      }
      const prod = await Product.findOneAndRemove({ _id: prodId });
      if (!prod) { 
        return res.json({message: "Item Not Deleted!"})
      }
      return res.json({message: "Item Deleted"})
    } catch (e) { 
      console.error(e)
    }
  }
  async getAll(req, res) {
    try {
      const prods = await Product.find();
      return res.json(prods);
    } catch (e){ 
      console.error(e)
    }
  }

}

module.exports = new ProductController();