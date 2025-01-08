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
    checklist1: {
        type: Boolean, 
        default: false
    },
    checklist2: {
        type: Boolean,
        default: false
    }

})

module.exports = mongoose.model('User', userSchema)
