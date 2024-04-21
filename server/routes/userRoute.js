const express =require('express') ;
const {getUserLists} = require('../controllers/userController');
const {verifyToken} =require("../services/verifyToken")
const router = express.Router();

router.get('/list/:id', verifyToken,getUserLists)

module.exports = router;
