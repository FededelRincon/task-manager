const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/tasks-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})



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

