const express =require('express') ;
const { updateProfile,deleteUser } = require('../controllers/userController');
const {verifyToken} =require("../services/verifyToken")
const router = express.Router();


router.post('/update/:id', verifyToken, updateProfile);
router.post('/delete/:id', verifyToken,deleteUser)

module.exports = router;
