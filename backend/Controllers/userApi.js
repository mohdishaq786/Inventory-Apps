const asyncHandler = require("express-async-handler");
const User = require("../Model/userModel");
const generateToken = require("../Utility/generateToken");

//register user
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  //find user in db
  console.log("body", req.body);
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400).send({ error: "email already used by some other user" });
  }
  //else create in db
  //means add the new user
  const newUser = await User.create({ name, email, password });

  if (newUser) {
    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      password: newUser.password,
      isAdmin: newUser.isAdmin,
      pic: newUser.pic,
      token: generateToken(newUser._id),
    });
  } else {
    res.status(400).json({ error: "failed to add new user" });
  }
});
///login
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

module.exports = { registerUser, authUser };
