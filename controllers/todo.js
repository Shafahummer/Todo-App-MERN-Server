const Todos = require("../models/todo");
const Education = require("../models/education");

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
        res.json(todos)
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
        res.json(educations)
    })
}