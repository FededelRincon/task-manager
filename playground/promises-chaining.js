require('../src/db/mongoose')
const User = require('../src/models/user')

// User.findByIdAndUpdate('6012fa20598c1197b72cc2fb', {age: 1}).then((user) => {
//     console.log(user)
//     return User.countDocuments({ age: 1 })
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })

// User.findByIdAndUpdate('60141bbf169b0120d98f1666', {age: 1}).then((user) => {
//     console.log(user)
//     return User.countDocuments({ age: 1 })
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })

const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age })
    const count = await User.countDocuments({ age })
    return count
}

updateAgeAndCount('60141bbf169b0120d98f1666', 2).then((count) => {
    console.log(count)
}).catch((error) => {
    console.log(e)
})