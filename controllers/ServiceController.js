const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");
const Service = require("../models/Service");
const cloudinary = require("cloudinary").v2;
const cloudinaryModule = require('../utils/cloudinary');
const upload = cloudinaryModule.initializeCloudinary();

class ServiceController {
  async create(req, res) {
    try {
      const { img } = req.files || {};
      const { name, desc, link, category_id } = req.body;

      if (!img || !name || !desc || !link || !category_id) {
        return res.json({ message: "Required fields are not filled"});
      }

      const imgRes = await cloudinary.uploader.upload(img.tempFilePath, {
        resource_type: "image"
      });
      
      const result = await Service.create({ img: imgRes.secure_url, name, desc, link, category_id })
      res.json(result);

    } catch (e) { 
      console.error(e)
    }
  }
  async remove(req, res) {
    try {
      const serviceId = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(serviceId)) {
        return res.status(404).json({ message: "Invalid serviceId" });
      }
      const serv = await Service.findOneAndRemove({ _id: serviceId });
      if (!serv) { 
        return res.json({message: "Item Not Deleted!"})
      }
      return res.json({message: "Item Deleted"})
    } catch (e) { 
      console.error(e)
    }
  }
  async getAll(req, res) {
    try {
      const services = await Service.find();
      return res.json(services);
    } catch (e){ 
      console.error(e)
    }
  }

}

module.exports = new ServiceController();