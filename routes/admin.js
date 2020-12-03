var express = require('express')
var router = express.Router()
const { isLoggedIn, isAdmin } = require('../controllers/auth')
const { addTodo, addEducation } = require('../controllers/todo')


router.post('/add_todo', isLoggedIn, isAdmin, addTodo)
router.post('/add_education', isLoggedIn, isAdmin, addEducation)

module.exports = router;
