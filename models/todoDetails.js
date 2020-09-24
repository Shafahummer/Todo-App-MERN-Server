const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types

const todoDetailsSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        default: 'Untitled'
    },
    education: {
        type: ObjectId,
        ref: 'Education',
        required: true
    },
    todos: {
        type: ObjectId,
        ref: 'Todos',
        required: true
    },
    todo_date: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        default: "No photo"
    }
}, { timestamps: true })
module.exports = mongoose.model("TodoDetails", todoDetailsSchema)
