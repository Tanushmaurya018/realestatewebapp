const express =require("express");
const { createListing,deleteList,updateList } = require("../controllers/listingController");
const { verifyToken } = require("../services/verifyToken");

const router=express.Router()

router.post("/createlisting",verifyToken,createListing)
router.post('/delete/:id', verifyToken,deleteList)
router.post('/update/:id', verifyToken,updateList)

module.exports = router;