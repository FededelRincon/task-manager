const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


//creo el esquema (basicamente se usa para poder meterle de alguna forma los middleware)
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
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
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id:user._id.toString() }, 'thisismynewcourse')

    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
}

//static vs methods: static(down) act on the entire collection while methods(up) act on an individual document

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })

    if (!user) {
        throw new Error('Unable to login ')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return user
}



//hash the plain text password before saving
//middleware (antes del userSchema, por eso se ejecuta al cread o update algo)
userSchema.pre('save', async function (next) { //usa 'save', porque es uno de los patrones que usa (pueden ser save, validator, remote, init, etc. SAVE deberia ser uno nuevo)
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

//creamos el modelo (usando el esquema, xq?, para mediante el userSchema poder meterle middleware con pre y post)
const User = mongoose.model('User', userSchema) //mongoose usa el string 'User', lo pone en minusculas y en plural, y crea o usa la ya creada db con ese nombre
    //Cuando alguien llama a User.findby.... le interesa el modelo, no el esquema, es el modelo quien define la coleccion, y setea el pre esquema + esquema + post esquema

module.exports = User