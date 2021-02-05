const express = require('express')
require('./db/mongoose') //aca pongo asi xq solo necesito q se conecte a mongoose pero no lo uso como constante
const userRouter = require('./routes/user')
const taskRouter = require('./routes/task')

const app = express()
const port = process.env.PORT || 3000

// app.use((req, res, next) => {
//     if (req.method === 'GET') {
//         res.send('GET request are disabled')
//     } else {
//         next()
//     }
// })

app.use((req, res, next) => {
    res.status(503).send('maintenance server, try again later')
})

app.use(express.json()) //para q los datos que vienen se los pueda parsear, en por ej: req.body
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log(`Server is up on port: ${port}`)
})


// //messing around with webtoken
// const jwt = require('jsonwebtoken')

// const myFunction = async () => {
//     const token = jwt.sign({ _id:'abc123' }, 'thisismynewcourse', { expiresIn: '7 days'})
//     console.log(token)

//     const data = jwt.verify(token, 'thisismynewcourse')
//     console.log(data) //da error o da el _id:'abc123' para que sea comparado entre db y lo q mando el usuario
// }



// myFunction()