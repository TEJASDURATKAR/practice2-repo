const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const PORT = 3000;
const mongoose = require('mongoose');

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

mongoose
.connect('mongodb://127.0.0.1:27017/blogger_db555')
.then(()=>{
    console.log('Mongodb Mongoose connected')



const userRouter = require('./router/user-router');

app.use('/perticular',userRouter);


app.listen(PORT,()=>{
  console.log(`Server Started ${PORT}`)
})

}).catch(error=>{
  console.log('error starting server :',error)

});

