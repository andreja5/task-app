const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL, 
  { useNewUrlParser: true, 
    useCreateIndex: true, 
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log('Connected to the database...')
  })
  .catch(() => {
    console.log('Unable to connect to the database...')
  })



