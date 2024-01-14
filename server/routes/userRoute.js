const express =require('express') ;
const { updateProfile,deleteUser ,getUserLists,} = require('../controllers/userController');
const {verifyToken} =require("../services/verifyToken")
const router = express.Router();


router.post('/update/:id', verifyToken, updateProfile);
router.post('/delete/:id', verifyToken,deleteUser)
router.get('/list/:id', verifyToken,getUserLists)

module.exports = router;
