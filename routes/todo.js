var express = require('express')
var router = express.Router()
const { isLoggedIn } = require('../controllers/auth')
const { getAllTodos, getAllEducation, createTodo, getTodo, deleteTodo } = require('../controllers/todo')


router.get('/get_educations', isLoggedIn, getAllEducation)
router.get('/get_todos', isLoggedIn, getAllTodos)
router.post('/create_todo', isLoggedIn, createTodo)
router.get('/get_todo', isLoggedIn, getTodo)
router.delete('/delete_todo', isLoggedIn, deleteTodo)

module.exports = router;
