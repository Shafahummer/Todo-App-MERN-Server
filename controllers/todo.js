const Todos = require("../models/todo");
const Education = require("../models/education");
const TodoDetails = require("../models/todoDetails");
const formidable = require('formidable');
const fs = require('fs');

exports.addTodo = (req, res) => {
    const { todo } = req.body;
    if (!todo) {
        return res.json({ error: "Please add a todo..." });
    }
    Todos.findOne({ todo: todo }).then((savedTodo) => {
        if (savedTodo) {
            return res.json({ error: "Todo already exists!" });
        } else {
            const todos = new Todos({ todo })
            todos.save((err, todo) => {
                if (err) {
                    return res.json({
                        error: "Not able to save todo!"
                    })
                }
                res.json({
                    message: "Todo added successfully...",
                    todo
                })
            })
        }
    })
}

exports.getAllTodos = (req, res) => {
    Todos.find().exec((err, todos) => {
        if (err) {
            return res.json({
                error: "No todos found!"
            })
        }
        res.json({ todos })
    })
}

exports.addEducation = (req, res) => {
    const { education } = req.body;
    if (!education) {
        return res.json({ error: "Please add an education title..." });
    }
    Education.findOne({ education: education }).then((savedEducation) => {
        if (savedEducation) {
            return res.json({ error: "Education already exists!" });
        } else {
            const new_education = new Education({ education })
            new_education.save((err, education) => {
                if (err) {
                    return res.json({
                        error: "Not able to save education!"
                    })
                }
                res.json({
                    message: "Education added successfully...",
                    education
                })
            })
        }
    })
}

exports.getAllEducation = (req, res) => {
    Education.find().exec((err, educations) => {
        if (err) {
            return res.json({
                error: "No education title found!"
            })
        }
        res.json({ educations })
    })
}

// if image uploaded to any other resource and only saving the url of image,the use this way

// exports.createTodo = (req, res) => {
//     const { title, education, todos, todo_date, photo } = req.body;
//     if (!todos || !todo_date || !education) {
//         return res.json({ error: "Todo title,education and date are mandatory..." });
//     }
//     TodoDetails.findOne({ title: title, createdBy: req.user._id })
//         .then((savedTodoDetails) => {
//             if (savedTodoDetails) {
//                 return res.json({ error: "Todo title already exists!" });
//             } else {
//                 const todoDetails = new TodoDetails({
//                     createdBy: req.user,
//                     title,
//                     education,
//                     todos,
//                     todo_date,
//                     photo
//                 })
//                 todoDetails.save((err, todoDetails) => {
//                     if (err) {
//                         return res.json({
//                             error: "Not able to save todo!"
//                         })
//                     }
//                     todoDetails.createdBy.password = undefined
//                     todoDetails.createdBy.role = undefined
//                     res.json({
//                         message: "Todo created successfully...",
//                         todo: todoDetails
//                     })
//                 })
//             }
//         })
// }


exports.createTodo = (req, res) => {
    const form = new formidable.IncomingForm()
    form.keepExtensions = true

    form.parse(req, (err, fields, file) => {
        if (err) {
            return res.json({
                error: "Something wrong!May be the problem with image!"
            })
        }

        TodoDetails.findOne({ title: fields.title, createdBy: req.user._id })
            .then((savedTodoDetails) => {
                if (savedTodoDetails) {
                    return res.json({ error: "Todo title already exists!" });
                } else {
                    const { title, education, todos, todo_date, photo } = fields

                    if (!todos || !todo_date || !education) {
                        return res.json({ error: "Todo title,education and date are mandatory..." });
                    }

                    const todoDetails = new TodoDetails({
                        createdBy: req.user,
                        title,
                        education,
                        todos: JSON.parse(todos),
                        todo_date,
                        photo
                    })

                    //handling image
                    if (photo) {
                        if (file.photo.size > 5000000) {
                            return res.json({
                                error: "File size too big!"
                            })
                        }
                        todoDetails.photo.data = fs.readFileSync(file.photo.path)
                        todoDetails.photo.contentType = file.photo.type
                    }
                    todoDetails.save((err, todoDetails) => {
                        if (err) {
                            console.log("db error--->", err)
                            return res.json({
                                error: "Not able to save todo!"
                            })
                        }
                        todoDetails.createdBy.password = undefined
                        todoDetails.createdBy.role = undefined
                        res.json({
                            message: "Todo created successfully...",
                            todo: todoDetails
                        })
                    })
                }
            })
    })
}

exports.getTodo = (req, res) => {
    TodoDetails.find({ createdBy: req.user._id })
        .populate("createdBy", "_id email name")
        .populate("education", "_id education")
        .populate("todos", "_id todo")
        .exec((err, savedTodoDetails) => {
            if (err) {
                return res.json({
                    error: "No todos found!"
                })
            }
            res.json({ todo: savedTodoDetails })
        })
}