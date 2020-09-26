var express = require('express')
var router = express.Router()
const { isLoggedIn, isAdmin } = require('../controllers/auth')
const { addTodo, getAllTodos, addEducation, getAllEducation } = require('../controllers/todo')

router.post('/add_todo', isLoggedIn, isAdmin, addTodo)
router.post('/add_education', isLoggedIn, isAdmin, addEducation)
router.get('/get_educations', isLoggedIn, getAllEducation)
router.get('/get_todos', isLoggedIn, getAllTodos)

module.exports = router;
