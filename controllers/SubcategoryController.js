const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");
const Subcategory = require("../models/Subcategory");
const cloudinary = require("cloudinary").v2;
const cloudinaryModule = require('../utils/cloudinary');
const upload = cloudinaryModule.initializeCloudinary();

class SubcategoryController {
  async create(req, res) {
    try {
      const { img } = req.files || {};
      const { name, desc, link, category_id } = req.body;

      if (!img || !name || !link ) {
        return res.json({ message: "Required fields are not filled"});
      }
      const imgRes = await cloudinary.uploader.upload(img.tempFilePath, {
        resource_type: "image"
      });
      
      const result = await Subcategory.create({ img: imgRes.secure_url, name, desc, link, category_id })
      res.json(result);

    } catch (e) { 
      console.error(e)
    }
  }
 
  async remove(req, res) {
    try {
      const subcategId = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(subcategId)) {
        return res.status(404).json({ message: "Invalid categId" });
      }
      const subcateg = await Subcategory.findOneAndRemove({ _id: subcategId });
      if (!subcateg) { 
        return res.json({message: "Item Not Deleted!"})
      }
      return res.json({message: "Item Deleted"})
    } catch (e) { 
      console.error(e)
    }
  }
  async getAll(req, res) {
    try {
      let query = req.query || {};
      const subcategories = await Subcategory.find(query);
      return res.json(subcategories);
    } catch (e){ 
      console.error(e)
    }
  }

}

module.exports = new SubcategoryController();