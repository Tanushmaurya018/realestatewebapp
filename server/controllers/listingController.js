const bcrypt = require("bcrypt");
const { pool } = require("../db");

const createListing = (req, res) => {
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
  const author_id = req.user._id;

  const queryString = `
    INSERT INTO listings (
      title,
      listingDescription,
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
      author_id
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [
    title || null,
    description || null,
    address || null,
    furnished || null,
    parking || null,
    rent || null,
    sale || null,
    bedroom || null,
    bathroom || null,
    regularprice || null,
    discountedprice || null,
    JSON.stringify(imageUrls) || null,
    author_id || null,
  ];

  pool.query(queryString, values, (error, results) => {
    if (error) {
      console.error("Error creating listing:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    res.json({ savedListing: results });
  });
};

const getList = (req, res) => {
  const queryString = "SELECT * FROM listings WHERE id = ?";
  const listingId = req.params.id;
  pool.query(queryString, [listingId], (error, list) => {
    if (error) {
      console.error("Error fetching list:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    // console.log(list)
    const authorId = list[0]?.author_id;

    pool.query("SELECT * FROM users WHERE id = ?", [authorId], (error, author) => {
      if (error) {
        console.error("Error fetching user for list:", error);
        return res.status(500).json({ message: "Internal Server Error" });
      }
      const userWoPassword = {
        _id: author[0]?.id,
        email: author[0]?.email,
        username: author[0]?.username,
        photoURL: author[0]?.photoURL,
      };
      res.json({ list, userWoPassword });
    });
  });
};

const getAllList = (req, res) => {
  pool.query("SELECT * FROM listings", (error, allList) => {
    if (error) {
      console.error("Error fetching all lists:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }

    res.json({ allList, message: "User Logged In" });
  });
};

// const getSearchList = (req, res) => {
//   const { searchTerm, rent, sale, offer, parking, furnished } = req.body;

//   res.json({ message: "helluu" });
// };

module.exports = {
  createListing,
  getList,
  getAllList,
};
