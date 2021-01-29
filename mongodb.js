//CRUD create read update delete

const {MongoClient, ObjectID, } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser:true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!!!')
    }

    const db = client.db(databaseName) 

    //deleteOne
    // db.collection('tasks').deleteOne({
    //     description: 'clean the house'  //la condicion
    // })
    // .then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })

    //delete many
    // db.collection('users').deleteMany({
    //     age: 27
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })




})