const Listing = require("../models/listing");
const User = require("../models/user");
// const defaultList = "../defaultList.png";

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
    imageUrls,
    discountedprice,
  } = req.body;
  const author = req.user;
  const newListing = new Listing({
    title,
    description : req.body.description === "" && undefined,
    address,
    furnished,
    parking,
    rent,
    sale,
    bedroom,
    bathroom,
    regularprice,
    discountedprice,
    imageUrls:
      req.body.imageUrls && req.body.imageUrls.length > 0
        ? req.body.imageUrls
        : undefined,
    author,
  });
  console.log(newListing.imageUrls);

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
const getToUpdateList = async (req, res) => {
  const toUpadateList = await Listing.findById(req.params.id);
  console.log("ddd", toUpadateList);
  res.json(toUpadateList);
};
const updateList = async (req, res) => {
  const list = await Listing.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  console.log("fgk", list);
  res.json({ list });
};

const getList = async (req, res) => {
  // console.log(req.params.id)
  const list = await Listing.findById(req.params.id);
  const authorId = list.author;
  // console.log(authorId)
  const author = await User.findById(authorId);
  // console.log(author)

  const userWoPassword = {
    _id: author._id,
    email: author.email,
    username: author.username,
    photoURL: author.photoURL,
  };
  console.log(userWoPassword);
  return res.json({ list, userWoPassword });
};
module.exports = {
  createListing,
  deleteList,
  updateList,
  getToUpdateList,
  getList,
};
