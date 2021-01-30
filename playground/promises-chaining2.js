require('../src/db/mongoose')
const Task = require('../src/models/task')

Task.findByIdAndDelete('601426c74ed17129bf97ac72').then((task) => { // findByIdAndRemove va a ser deprecado
    console.log(task) //muestro lo q se va a borrar
    return Task.countDocuments({ completed: false })
}).then((result) => {
    console.log(result)
}).catch((e) => {
    console.log(e)
})