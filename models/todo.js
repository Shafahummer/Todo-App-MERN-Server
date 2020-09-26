const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    todo: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true })
module.exports = mongoose.model('Todos', todoSchema)