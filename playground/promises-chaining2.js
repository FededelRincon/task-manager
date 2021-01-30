require('../src/db/mongoose')
const Task = require('../src/models/task')

Task.findByIdAndDelete('601426c74ed17129bf97ac72').then((task) => { //findByIdAndDelete es mas rapido xq borra directamente. pero findByIdAndRemove es "mas lento" porque lo busca y lo modifica como vacio, no lo borra como tal, aunque el resultado final es el mismo
    console.log(task) //muestro lo q se va a borrar
    return Task.countDocuments({ completed: false })
}).then((result) => {
    console.log(result)
}).catch((e) => {
    console.log(e)
})