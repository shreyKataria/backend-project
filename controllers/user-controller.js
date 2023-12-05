const userModel = require("../model/user-model");
const bcrypt = require("bcryptjs");

const getAllUsers = async (req, res, next) => {
  let users;
  try {
    users = await userModel.find();
  } catch (error) {
    console.log(error);
  }
  if (!users) {
    return res.status(404).json({ message: " user not found" });
  }
  return res.status(200).json({ users });
};

const signUp = async (req, res, next) => {
  const { name, email, password } = req.body;

  let existingUser;

  try {
    existingUser = await userModel.findOne({ email });
  } catch (error) {
    return console.log(error);
  }

  if (existingUser) {
    return res.status(400).json({ message: "user already exist" });
  }

  const hashPassword = bcrypt.hashSync(password);

  const newUser = new userModel({
    name,
    email,
    password: hashPassword,
    posts: [],
  });

  try {
    await newUser.save();
  } catch (error) {
    return console.log(error);
  }

  return res.status(201).json({ newUser });
};

const logIn = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;

  try {
    existingUser = await userModel.findOne({ email });
  } catch (error) {
    return console.log(error);
  }

  if (!existingUser) {
    return res.status(404).json({ message: "user not found try again" });
  }
  const comparePassword = bcrypt.compareSync(password, existingUser.password);

  if (!comparePassword) {
    return res.status(400).json({ message: "Incorrect password" });
  }
  return res.status(200).json({ message: "login Successful!" });
};

module.exports = {
  getAllUsers,
  signUp,
  logIn,
};
