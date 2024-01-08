const bcrypt = require("bcrypt");
const User = require("../models/user");

async function updateProfile(req, res) {
  if (req.user._id != req.params.id)
    return res.json({ message: "You can only update your own account!" });
  try {
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(
        req.body.password,
        Number(process.env.SALT)
      );
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          photoURL: req.body.photoURL,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;

    res.status(200).json(rest);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  updateProfile,
};
