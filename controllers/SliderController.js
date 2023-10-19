const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");
const Slider = require("../models/Slider");
const cloudinary = require("cloudinary").v2;
const cloudinaryModule = require('../utils/cloudinary');
const upload = cloudinaryModule.initializeCloudinary();

class SliderController {
  async create(req, res) {
    try {
      const { img } = req.files || {};
      const { name, desc, link } = req.body;

      if (!img || !name || !desc || !link) {
        return res.json({ message: "Required fields are not filled"});
      }

      const imgRes = await cloudinary.uploader.upload(img.tempFilePath, {
        resource_type: "image"
      });
      
      const result = await Slider.create({ img: imgRes.secure_url, name, desc, link })
      res.json(result);

    } catch (e) { 
      console.error(e)
    }
  }
  async remove(req, res) {
    try {
      const sliderId = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(sliderId)) {
        return res.status(404).json({ message: "Invalid sliderId" });
      }
      const slider = await Slider.findOneAndRemove({ _id: sliderId });
      if (!slider) { 
        return res.json({message: "Item Not Deleted!"})
      }
      return res.json({message: "Item Deleted"})
    } catch (e) { 
      console.error(e)
    }
  }
  async getAll(req, res) {
    try {
      const slides = await Slider.find();
      return res.json(slides);
    } catch (e){ 
      console.error(e)
    }
  }

}

module.exports = new SliderController();