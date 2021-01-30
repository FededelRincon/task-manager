require('../src/db/mongoose')
const e = require('express')
const Task = require('../src/models/task')
const User = require('../src/models/user')

// Task.findByIdAndDelete('601426c74ed17129bf97ac72').then((task) => { // findByIdAndRemove va a ser deprecado
//     console.log(task) //muestro lo q se va a borrar
//     return Task.countDocuments({ completed: false })
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })

const deleteTasksAndCount = async (id) => {
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({ completed: false})
    return count
}

deleteTasksAndCount('601323821741bb63351f9f57').then((count) => {
    console.log(count)
}).catch((error) => {
    console.log(error)
})