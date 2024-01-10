const express =require("express");
const { uploadListing } = require("../controllers/listingController");
const { verifyToken } = require("../services/verifyToken");

const router=express.Router()

router.post("/upload",verifyToken,uploadListing)

module.exports = router;