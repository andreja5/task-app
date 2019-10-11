require('../src/db/mongoose');

const Task = require('../src/models/task');

// Task.findByIdAndRemove('5d9c4a59ee6a6e1b186ec217')
//   .then(task => {
//     console.log(task)
//     return Task.countDocuments({})
//   })
//   .then(res => {
//     console.log(res)
//   })
//   .catch(e => {
//     console.log(e)
//   })

const deleteTaskAndCount = async (id) => {
  const task = await Task.findByIdAndRemove(id);
  const count = await Task.countDocuments({ completed: false });

  return count;
}

deleteTaskAndCount('5d9c8a9c88051b3a0ce97ef1')
  .then(res => {
    console.log(res);
  })
  .catch(e => {
    console.log(e)
  })