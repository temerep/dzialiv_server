const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

class AdminController {
  async registration(req, res) {
    const { username, password } = req.body;

    const hashPassword = await bcrypt.hash(password, 5);
    const admin = await Admin.create({ username, password: hashPassword });

    return res.json(admin);
  }

  async login(req, res, next) {
      const {username, password} = req.body;
      let user;

      if(username){
          user = await Admin.findOne({username});
      }

      if(!user){
        return res.status(404).json({message: 'User Not Found'});
      }

      let comparePassword = bcrypt.compareSync(password, user.password);
    
      if(!comparePassword){
        return res.status(401).json({ message: 'Incorrect Password'});
      }

      const token = jwt.sign(
          {id: user.id},
          process.env.SECRET_KEY,
          {expiresIn: '24h'}
      )

      return res.json({token});
  }

  async check(req, res) {
    const token = jwt.sign({ id: req.userId }, process.env.SECRET_KEY, { expiresIn: "24h" });

    return res.json({ token });
  }
}

module.exports = new AdminController();