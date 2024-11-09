//importing user model
const User = require("../Model/userModel");
const jwt = require('jsonwebtoken')

// creates a  new user
const createUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    res.status(409).json({ message: "User already exists, please login" });
  } else {
    try {
      const newUser = await User.create({
        email: email,
        password: password, //password will be hashed in the schema
      });

      // Send a success response
      res
        .status(201)
        .json({ message: "User created successfully", user: newUser });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

//login users auth
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      const token = jwt.sign({userid: user._id}, process.env.JWT_SECRET);
      res.status(200).json({ token, message: "You are logged in" });
    } else {
      res.status(401).json({ message: "Invalid email or password!" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error, please try again later." });
  }
};

module.exports = {
  createUser,
  login,
};
