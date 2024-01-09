const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
if (!token) {
    return res.json({message:"Sign In to Your Account"})
}
  const payload = jwt.verify(token, process.env.TOKEN_SECRET);
  // console.log("verified", payload);

  if (!payload) {
    return res.json({message:"Not Authorized"})
  }

  req.user=payload,
  console.log(req.user)
  next();
};

module.exports={
    verifyToken,
}