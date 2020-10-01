var express = require('express')
var router = express.Router()
const { isLoggedIn, isAdmin } = require('../controllers/auth')
const { addTodo, getAllTodos, addEducation, getAllEducation, createTodo, getTodo, upload } = require('../controllers/todo')
const multer = require('multer')


router.post('/add_todo', isLoggedIn, isAdmin, addTodo)
router.post('/add_education', isLoggedIn, isAdmin, addEducation)
router.get('/get_educations', isLoggedIn, getAllEducation)
router.get('/get_todos', isLoggedIn, getAllTodos)
router.post('/create_todo', isLoggedIn, createTodo)


// router.post('/create_todo', isLoggedIn, upload, createTodo)

// const storage = multer.memoryStorage({
//     destination: function (req, file, callback) {
//         callback(null, '')
//     }
// })

// const upload = multer({ storage }).single('photo')

// router.post('/create_todo', upload, (req, res) => {
//     console.log("file----->", req.file);
//     res.send({
//         message: "Hello world!"
//     })
// })





router.get('/get_todo', isLoggedIn, getTodo)

module.exports = router;
