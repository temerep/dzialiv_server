const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");
const Product = require("../models/Product");

class ProductController {
  async create(req, res) {
    try {
      const { img, name, desc, link, subcategory_id } = req.body;

      if (!img || !name || !desc || !link || !subcategory_id) {
        return res.json({ message: "Required fields are not filled"});
      }
      
      const result = await Product.create({ img, name, desc, link, subcategory_id })
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