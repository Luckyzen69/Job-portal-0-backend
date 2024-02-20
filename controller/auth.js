const UserModel = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const signup = async (req, res, next) => {
  console.log("req.body", req.body);
  console.log("req.body");

  try {
    let hashedPassword = await bcrypt.hash(req.body.password, 12);
    console.log('Hashed password:', hashedPassword);

    const user = await UserModel.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      cpassword: hashedPassword,
      phone: req.body.phone,
      role: req.body.role,
      experience: req.body.experience,
      company: req.body.company,
      gender: req.body.gender,
    });

    const sanitizedUser = { ...user._doc };
    delete sanitizedUser.password;
    delete sanitizedUser.cpassword;

    res.send(sanitizedUser);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  console.log('Plaintext password:', password);
  console.log("req.body", req.body);
  
  if (!email || !password) {
    return res.status(400).send({ error: "Both email and password are required" });
  }
  
  try {
    const user = await UserModel.findOne({ email }).select('+password');  
    
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    console.log('Hashed password:', req.body.password);
    console.log('not password:', user.password);
    


    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      const sanitizedUser = { ...user._doc };
      delete sanitizedUser.password;
      delete sanitizedUser.cpassword;
      const SECRET_KEY = process.env.SECRET_KEY || 'shhhhh';
      const token = jwt.sign(sanitizedUser, SECRET_KEY,{
        expiresIn : 4759831490000
      });
          console.log(token);          

      return res.json({ status: true, message: "login successfully", token });
    } else {
      res.status(401).send({ error: "Invalid password" });
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};
module.exports = {
  login,
  signup,
};
