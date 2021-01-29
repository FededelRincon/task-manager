//CRUD create read update delete

// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID

const {MongoClient, ObjectID, } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

// const id = new ObjectID()
// console.log(id.id)
// //console.log(id.getTimestamp())
// console.log(id.id.length)
// console.log(id.toHexString().length)


MongoClient.connect(connectionURL, { useNewUrlParser:true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!!!')
    }
    //console.log('Connected correctly!!!')

    const db = client.db(databaseName) //para q nos cree y/o use la ddbb


/////////////////// PENSANDO EN EL CRUD: esto es el create
    //4) INSERT ONE(pero aca se hizo el require con {}, y sobreescribiendo la id)
    // db.collection('users').insertOne({
    //     //_id:id,
    //     name: 'Vikram',
    //     age: 26
    // }, (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert user')
    //     }
    //     console.log(result.ops)
    // })

    //1) INSERT ONE
    // db.collection('users').insertOne({
    //     name: 'Andrew',
    //     age: 27
    // }, (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert user')
    //     }
    //     console.log(result.ops)
    // })

    //2) INSERT MANY
    // db.collection('users').insertMany([
    //     {
    //         name: 'Jen',
    //         age: 28
    //     }, {
    //         name: 'Gunther',
    //         age:27
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert documents!')
    //     }

    //     console.log(result.ops)
    // })

    //3) Otro INSERT MANY
    // db.collection('tasks').insertMany([
    //     {
    //         description: 'clean the house',
    //         completed: true
    //     }, {
    //         description: 'Renew inspection',
    //         completed: false
    //     }, {
    //         description: 'Pot plants',
    //         completed: false
    //     }
    // ], (error, result) => {
    //     if(error) {
    //         return console.log('Unable to insert tasks!')
    //     }

    //     console.log(result.ops)
    // })


/////////////////// PENSANDO EN EL CRUD: esto es el read
        //para buscar algo creado en la collecion "users"
        db.collection('users').findOne({ name: 'Jen' }, (error, user) => {
            if (error) {
                console.log('Unable to fetch')
            }
    
            console.log(user)
            //si no hay nada con esas condiciones muestra un null
        })
        
        
        //para buscar algo creado en la collecion "users"
        db.collection('users').findOne({ name: 'Jen', age: 1 }, (error, user) => {
            if (error) {
                console.log('Unable to fetch')
            }
    
            console.log(user)
            //si no hay nada con esas condiciones muestra un null
        })
    
    
        //para buscar algo creado en la collecion "users", pero con _id
        db.collection('users').findOne({ _id: new ObjectID('60108b4c91f9f45661e87312') }, (error, user) => {
            if (error) {
                console.log('Unable to fetch')
            }
    
            console.log(user)
            //si busco sin el ObjectID nos devuelve un Null
        })

        //para buscar muchas cosas
        db.collection('users').find({ age:27 }). toArray((error, users) => {
            console.log(users)
        })

        //para mostrar el numero de todas las cosas que busco
        db.collection('users').find({ age:27 }).count((error, count) => {
            console.log(count)
        })

        //mas ejemplo de lo mismo
        db.collection('tasks').findOne({_id: new ObjectID('60105b800b5c3e40367861c5')}, (error, task) => {
            //falta el error x las dudas
            console.log(task)
        })
        
        //mas ejemplo de lo mismo de arriba
        db.collection('tasks').find({completed: false}).toArray((error, tasks) => {
            //falta el error x las dudas
            console.log(tasks)
        })

        //Video 080
            //para update cosas de a una en la ddbb (usando set)
            // db.collection('users').updateOne({
            //     _id: new ObjectID('6010574238b4a73e02761841')
            // }, {
            //     $set: { //solo va a cambiar lo que este adentro de set
            //         name: 'Mike'
            //     }
            // }).then((result) => {
            //     console.log(result)
            // }).catch((error) => {
            //     console.log(error)
            // })

            // para update cosas de a una en la ddbb (usando inc, de increment)
            // db.collection('users').updateOne({
            //     _id: new ObjectID('6010574238b4a73e02761841')
            // }, {
            //     $inc: {
            //         age: 1
            //     }
            // }).then((result) => {
            //     console.log(result)
            // }).catch((error) => {
            //     console.log(error)
            // })

            // para update cosas de a muchas en la ddbb
            // db.collection('tasks').updateMany({
            //     completed: false
            // }, {
            //     $set: {
            //         completed: true
            //     }
            // }).then((result) => {
            //     console.log(result.modifiedCount)
            // }).catch((error) => {
            //     console.log(error)
            // })


        //Video 81
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
