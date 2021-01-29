const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/tasks-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

//creamos el modelo
const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if(value.toLowerCase().includes('password')) {
                throw new Error('please, dont use a word password')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number')
            }
        }
    }
})

//creamos la instancia
// const me = new User({
//     name: 'Andrew',
//     age: 27      //esta funciona xq es un number, como esta seteado arriba
//     age: 'Mike'  //esta no funciona xq es un string
// })

// const me = new User({
//     name: '     Mike    ',
//     email: 'MYEMAIL@MEAD.IO     ',
//     password: 'phone098!'
// })

// //guardamos el modelo en la db
// me.save().then(() => {
//     console.log(me)
// }).catch((error) => {
//     console.log('Error: ', error)
// })

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

const nombreRandom = new Task({
    description: "      Eat lunch   "
})

nombreRandom.save().then(() => {  //aca no hace falta meter la variable en la funcion flecha, xq la misma variable ya esta en la parte del .save()
    console.log(nombreRandom)
}).catch((error) => {
    console.log(error)
})