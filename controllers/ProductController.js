const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");
const Product = require("../models/Product");
const cloudinary = require("cloudinary").v2;
const cloudinaryModule = require('../utils/cloudinary');
const upload = cloudinaryModule.initializeCloudinary();

class ProductController {
  async create(req, res) {
    try {
      const { img } = req.files || {};
      const { name, desc, subcategory_id, link } = req.body;

      if (!img || !name || !desc || !subcategory_id || !link) {
        return res.json({ message: "Required fields are not filled"});
      }

      const imgRes = await cloudinary.uploader.upload(img.tempFilePath, {
        resource_type: "image"
      });
      
      const result = await Product.create({ img: imgRes.secure_url, name, desc, link, subcategory_id })
      res.json(result);

    } catch (e) { 
      console.error(e.response.data)
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