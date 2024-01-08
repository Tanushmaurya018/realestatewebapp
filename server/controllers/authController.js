const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



const signup = async (req, res) => {
  const { username, email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    return res.json({ message: "User already exist" });
  }

  const hashedPassword = bcrypt.hashSync(password, Number(process.env.SALT));

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  const savedUser = await newUser.save();
  return res.send({ message: "User Created" });
};

async function login(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.json({ message: "User doesn't exists" });
  }
  const validatePassword = bcrypt.compareSync(password, user.password);
  if (!validatePassword) {
    return res.json({ message: "Wrong credentials" });
  }
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  const userWoPassword = {
    _id: user._id,
    email: user.email,
    username: user.username,
    photoURL:user.photoURL,

  };
  return res
    .cookie("access_token", token, { httpOnly: true })
    .json({ message: "Logged In successfully", userWoPassword });
}

async function google(req, res) {
  const { username, email, photoURL } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    const userWoPassword = {
      _id: user._id,
      email: user.email,
      username: user.username,
      photoURL:user.photoURL,
    };

    return res
      .cookie("access_token", token, { httpOnly: true })
      .json({ message: "Logged In successfully", userWoPassword });
  }

  const password = Math.random().toString(36).substring(2);

  const hashedPassword = bcrypt.hashSync(password, Number(process.env.SALT));

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
    photoURL,
  });

  const savedUser = await newUser.save();

  const token = jwt.sign({ _id: newUser._id }, process.env.TOKEN_SECRET);
  const userWoPassword = {
    _id: newUser._id,
    email: newUser.email,
    username: newUser.username,
    photoURL:newUser.photoURL,
  };
  
  return res
    .cookie("access_token", token, { httpOnly: true })
    .json({ message: "Logged In successfully and User Created ", userWoPassword });
}

module.exports = {
  signup,
  login,
  google,
};
