const express =require('express') ;
const { updateProfile } = require('../controllers/userController');
const {verifyToken} =require("../services/verifyToken")
const router = express.Router();


router.post('/update/:id', verifyToken, updateProfile);
// router.get('/signout', signOut)

module.exports = router;
