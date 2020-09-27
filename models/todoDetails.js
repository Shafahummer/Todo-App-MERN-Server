const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types

const todoDetailsSchema = new mongoose.Schema({
    createdBy: {
        type: ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        trim: true,
        required: true
    },
    education: {
        type: ObjectId,
        ref: 'Education'
    },
    todos: [{
        type: ObjectId,
        ref: 'Todos',
        required: true
    }],
    todo_date: {
        type: Date,
        required: true
    },
    photo: {
        // type: String,
        // default: "No photo"
        data: Buffer,
        contentType: String
    }
}, { timestamps: true })
module.exports = mongoose.model("TodoDetails", todoDetailsSchema)

