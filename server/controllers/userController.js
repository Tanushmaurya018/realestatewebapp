const User = require("../models/user");
const bcrypt = require("bcrypt");
const signup = async (req, res) => {
  const { username, email, password } = req.body;


  const hashedPassword = bcrypt.hashSync(password, Number(process.env.SALT));

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  const savedUser = await newUser.save();
  return res.send({ mssg: "User Created", user: savedUser });
};
async function login (){
    const {email,password}=req.body;
    const user=await User.findOne({email})

    if(!user){
        return res.send("User doesn't exists")
    }

    return res.json({message:"Logged In Successively"})

    
    
}


module.exports = {
  signup,
  login
};
