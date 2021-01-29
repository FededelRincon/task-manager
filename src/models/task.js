const mongoose = require('mongoose')

const Task = mongoose.model('Task', { //mongoose usa el string 'Task', lo pone en minusculas y en plural, y crea la db con eses nombre
    description: {
        type: String,
        required: true,
        trim: true,
    },
    completed: {
        type: Boolean,
        default: false
    }
})

module.exports = Task