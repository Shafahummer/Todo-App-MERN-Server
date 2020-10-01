var express = require('express')
var router = express.Router()
const { isLoggedIn } = require('../controllers/auth')
const { getUser, updateUser, upload } = require('../controllers/user')

router.get('/user', isLoggedIn, getUser)
router.put('/update_user', isLoggedIn, upload, updateUser)


module.exports = router;
