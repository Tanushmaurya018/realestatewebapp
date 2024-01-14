const express =require("express");
const { createListing,deleteList,updateList ,getToUpdateList,getList} = require("../controllers/listingController");
const { verifyToken } = require("../services/verifyToken");

const router=express.Router()

router.post("/createlisting",verifyToken,createListing)
router.post('/delete/:id', verifyToken,deleteList)
router.post('/update/:id', verifyToken,updateList)
router.get('/update/:id', verifyToken,getToUpdateList)
router.get('/getlist/:id', verifyToken,getList)

module.exports = router;