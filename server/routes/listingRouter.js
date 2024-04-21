const express =require("express");
const { createListing,getList,getAllList} = require("../controllers/listingController");
const { verifyToken } = require("../services/verifyToken");

const router=express.Router()

router.post("/createlisting",verifyToken,createListing)
router.get('/getlist/:id',verifyToken,getList)
router.get('/getalllist',getAllList)

module.exports = router;