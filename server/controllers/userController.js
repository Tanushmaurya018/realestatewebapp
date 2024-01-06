const User = require("../models/user");
const bcrypt = require("bcrypt");
const signup = async (req, res) => {
  const { username, email, password } = req.body;

  const salt = bcrypt.genSaltSync(Number(process.env.SALT));

  const hashedPassword = bcrypt.hashSync(password, salt);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  const savedUser = await newUser.save();
  return res.send({ mssg: "User Created", user: savedUser });
};

module.exports = {
  signup,
};
