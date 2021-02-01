const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')


//creo el esquema (basicamente se usa para poder meterle de alguna forma los middleware)
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
                throw new Error('please, dont use a word password inside the password')
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

//middleware (antes del userSchema, por eso se ejecuta al cread o update algo)
userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

//creamos el modelo (usando el esquema, xq?, para mediante el userSchema poder meterle middleware con pre y post)
const User = mongoose.model('User', userSchema) //mongoose usa el string 'User', lo pone en minusculas y en plural, y crea o usa la ya creada db con ese nombre

module.exports = User