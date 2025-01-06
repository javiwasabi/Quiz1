const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userEmail: {
        type: String,
        required: true
    },
    score: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        default: true
    }
})

module.exports = mongoose.model('User', userSchema)