require('../src/db/mongoose');

const User = require('../src/models/user');

// User.findByIdAndUpdate('5d9c597087a7f32e186dbfc3', { age: 1 })
//   .then(user => {
//     console.log(user);
//     return User.countDocuments({ age: 2 })
//   }).then(res => {
//     console.log(res)
//   }).catch(e => {
//     console.log(e)
//   })

const updateAgeAndCount = async (id, age) => {
  const user = await User.findByIdAndUpdate(id, { age });
  const count = await User.countDocuments({ age })

  return count;
}

updateAgeAndCount('5d9c4742e6e0070cc44200d6', 5)
  .then(res => {
    console.log(res)
  })
  .catch(e => {
    console.log(e)
  })