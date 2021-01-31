const express = require('express')
require('./db/mongoose') //aca pongo asi xq solo necesito q se conecte a mongoose pero no lo uso como constante
const User = require('./models/user')
const Task = require('./models/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json()) //para q los datos que vienen se los pueda parsear, en por ej: req.body

//create user
app.post('/users', async (req, res) => {
    const user = new User(req.body)

    try{
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

//read users (many)
app.get('/users', async (req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    }catch (e) {
        res.status(500).send()
    }
})

//read user (one)
app.get('/users/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const user = await User.findById(_id)
        if(!user){
            return res.status(404).send()
        }
        res.send(user)

    } catch (e) {
        res.status(500).send()
    }
})

//update user
app.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})



//create task
app.post('/tasks', async (req, res) => {
    const task = new Task(req.body)

    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send()
    }
})

//read task (many)
app.get('/tasks', async (req, res) => {
    try {
        const task = await Task.find({})
        res.send(task)
    }catch (e){
        res.status(500).send()
    }
})

//read task (one)
app.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id

    try{
        const task = await Task.findById(_id)
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})



app.listen(port, () => {
    console.log(`Server is up on port: ${port}`)
})