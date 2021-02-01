const express = require('express')
require('./db/mongoose') //aca pongo asi xq solo necesito q se conecte a mongoose pero no lo uso como constante
const userRouter = require('./routes/user')
const taskRouter = require('./routes/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json()) //para q los datos que vienen se los pueda parsear, en por ej: req.body
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log(`Server is up on port: ${port}`)
})


//messing around with bcrypt
const bcrypt = require('bcryptjs')

const myFunction = async () => {
    const password = 'Red12345!'
    const hashedpassword = await bcrypt.hash(password, 8)

    console.log(password)
    console.log(hashedpassword)

    const isMatch = await bcrypt.compare('Red123456!', hashedpassword)
    console.log(isMatch)
}



myFunction()