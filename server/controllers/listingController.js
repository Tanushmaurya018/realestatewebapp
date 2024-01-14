const Listing = require("../models/listing");
const User = require("../models/user");

const createListing = async (req, res) => {
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
  const author = req.user;

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
  const user = await User.find({ _id: author });
  // console.log(user)
  // console.log(savedListing)
  res.json({ savedListing });
};
const deleteList = async (req, res) => {
  await Listing.findByIdAndDelete(req.params.id);
  const allLists = await Listing.find({});
  // console.log("Aaa",allLists)
  res.json({ data: allLists, message: "List Deleted" });
};
const getToUpdateList=async(req,res)=>{
  const toUpadateList=await Listing.findById(req.params.id);
  console.log("ddd",toUpadateList)
  res.json(toUpadateList)
}
const updateList = async (req, res) => {
  const list = await Listing.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  console.log("fgk",list)
  res.json({ list });
};
module.exports = {
  createListing,
  deleteList,
  updateList,
  getToUpdateList,
};
