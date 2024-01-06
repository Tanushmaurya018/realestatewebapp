const express =require('express') ;
const { login, signup } =require('../controllers/authController.js') ;

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
// router.post('/google', google);
// router.get('/signout', signOut)

module.exports = router;
