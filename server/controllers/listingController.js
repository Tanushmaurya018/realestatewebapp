const Listing = require("../models/listing");
const User = require("../models/user");

const createListing = async (req,res) => {
  const {
    title,
    description,
    address,
    furnished,
    parking,
    rent,
    sale,
    bedroom,
    bathroom,
    regularprice,
    discountedprice,
    imageUrls,
  } = req.body;
  const author=req.user;

  const newListing = new Listing({
    title,
    description,
    address,
    furnished,
    parking,
    rent,
    sale,
    bedroom,
    bathroom,
    regularprice,
    discountedprice,
    imageUrls,
    author,
  });

  const savedListing = await newListing.save();
const user=await User.find({_id:author})
  // console.log(user)
// console.log(savedListing)
  res.json({ savedListing });
};

module.exports = {
    createListing,
};
