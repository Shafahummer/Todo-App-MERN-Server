var express = require('express')
var router = express.Router()
const { check } = require('express-validator')
const {signup,signin} = require('../controllers/auth')

router.post('/signup',[
    check("name").isLength({ min: 3 }).withMessage('name must be at least 3 chars long'),
    check("email").isEmail().withMessage('enter a valid email'),
    check("password").isLength({ min: 5 }).withMessage('password must be at least 5 chars long'),
], signup)

router.post('/signin',[
    check("email").isEmail().withMessage('enter a valid email'),
    check("password").isLength({ min: 5 }).withMessage('password must be at least 5 chars long'),
], signin)

router.get('/',(req,res)=>{
    res.send("This is home page")
})


module.exports = router;
