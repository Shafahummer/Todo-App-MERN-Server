const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: Number,
        trim: true,
        default: 0
    },
    profile: {
        type: String,
        trim: true
    },
    todo_added: {
        type: Number,
        default: 0
    }
}, { timestamps: true })
module.exports = mongoose.model("User", userSchema)