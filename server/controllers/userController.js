const bcrypt = require("bcrypt");
const User = require("../models/user");

async function updateProfile(req, res) {
  const {username,email,photoURL}=req.body
  if (req.user._id != req.params.id)
    return res.json({ message: "You can only update your own account!" });
  try {
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(
        req.body.password,
        Number(process.env.SALT)
      );
    }
    const dupEmail=await User.findOne({email})

    if (dupEmail) {
      return res.json({message: "This email is already registered",userWoPassword:dupEmail})
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username ,
          email,
          password:req.body.password ,
          photoURL ,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;
    // console.log(updatedUser)

    res.status(200).json({message:"User Updated" ,userWoPassword: rest });
  } catch (error) {
    console.log(error);
  }
}

const deleteUser=async(req,res)=>{
  // console.log("a",req.user)
  if (req.user._id !== req.params.id)
  return res.json({ message: "You can only delete your account" });

    await User.findByIdAndDelete(req.params.id)

    return res.clearCookie("access_token").json({message:"Account Deleted"})
}

module.exports = {
  updateProfile,
  deleteUser,
};
