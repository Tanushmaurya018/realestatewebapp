const express =require("express");
const { createListing,deleteList,updateList ,getToUpdateList,getList,getAllList,getSearchList} = require("../controllers/listingController");
const { verifyToken } = require("../services/verifyToken");

const router=express.Router()

router.post("/createlisting",verifyToken,createListing)
router.post('/delete/:id', verifyToken,deleteList)
router.post('/update/:id', verifyToken,updateList)
router.get('/update/:id', verifyToken,getToUpdateList)
router.get('/getlist/:id',getList)
router.get('/getalllist',getAllList)
router.get('/searchlist/:id',verifyToken,getSearchList)

module.exports = router;