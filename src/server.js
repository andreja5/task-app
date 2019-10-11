const express = require('express');
const mongoose = require('./db/mongoose');

const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.use(userRouter);
app.use(taskRouter);

app.listen(port, () =>{
  console.log('Connected to the server at localhost ' + port);
})



