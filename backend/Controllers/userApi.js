const asyncHandler = require("express-async-handler");
const User = require("../Model/userModel");
const generateToken = require("../Utility/generateToken");

//register user
const registerUser = asyncHandler(async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the user already exists in the database
    const userExists = await User.findOne({ email });
    if (userExists) {
      res
        .status(400)
        .json({ error: "Email is already in use by another user" });
    } else {
      // Create a new user in the database
      const newUser = await User.create({ name, email, password });

      // If the user was successfully created, send a response
      if (newUser) {
        res.status(201).json({
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          isAdmin: newUser.isAdmin,
          pic: newUser.pic,
          token: generateToken(newUser._id),
        });
      } else {
        res.status(500).json({ error: "Failed to add a new user" });
      }
    }
  } catch (error) {
    // Handle any unexpected errors
    res.status(500).json({ error: "Server Error" });
  }
});

///login
const authUser = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      console.log("match--->");
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        pic: user.pic,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: "Invalid Email or Password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = { registerUser, authUser };
