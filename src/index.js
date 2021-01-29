const express = require('express')
require('./db/mongoose') //aca pongo asi xq solo necesito q se conecte a mongoose pero no lo uso como constante
const User = require('./models/user')
const Task = require('./models/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json()) //para q los datos que vienen se los pueda parsear, en por ej: req.body

app.post('/users', (req, res) => {
    const user = new User(req.body)

    user.save().then(() => {
        res.status(201).send(user)
    }).catch((e) => {
        res.status(400).send(e)
    })
})

app.post('/tasks', (req, res) => {
    const task = new Task(req.body)

    task.save().then(() => {
        res.status(201).send(task)
    }).catch((e) => {
        res.status(400).send(e)
    })
})

app.listen(port, () => {
    console.log(`Server is up on port: ${port}`)
})