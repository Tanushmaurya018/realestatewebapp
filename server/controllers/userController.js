const { pool } = require("../db");

const getUserLists = (req, res) => {

  if (req.user._id != req.params.id)
    return res.json({ message: "You can only view your own listing" });

  pool.query('SELECT * FROM listings WHERE author_id = ?', [req.params.id], (error, allLists) => {
    if (error) {
      console.error("Error fetching user listings:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }

    if (allLists.length === 0) {
      return res.json({ message: "No List available" });
    }
    res.json({ data: allLists, message: "Your Lists" });
  });
};

module.exports = {
  getUserLists,
};
