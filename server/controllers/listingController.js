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
  } = req.body;

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
    author:req.user,
  });

  const savedListing = await newListing.save();
const user=await User.findOne({author})
  console.log(user)
console.log(savedListing)
  res.json({ savedListing });
};

module.exports = {
    createListing,
};
