const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");
const Subcategory = require("../models/Subcategory");

class SubcategoryController {
  async create(req, res) {
    try {
      const { img, name, desc, link, category_id } = req.body;

      if ( !name || !link ) {
        return res.json({ message: "Required fields are not filled"});
      }
      
      const result = await Subcategory.create({ img, name, desc, link, category_id })
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
      const subcategories = await Subcategory.find();
      return res.json(subcategories);
    } catch (e){ 
      console.error(e)
    }
  }

}

module.exports = new SubcategoryController();