const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const app = express()


process.env.ServerPort = 5000;
process.env.DbPort = 'mongodb://localhost:27017/professional'

app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());
app.use(cors())
app.use(morgan('combined'))

try{
  mongoose.connect(process.env.DbPort,{
    useNewUrlParser:true,
    useUnifiedTopology: true,
    useFindAndModify:false,
    useCreateIndex:true
  })
  console.log('Connected with the Database')
}
catch{
  console.log('Error Connecting with the Database!!')
}

const postRouting = require('./routes/postRouting')
const userRouting = require('./routes/userRouting')

app.use('/posts', postRouting)
app.use('/users', userRouting)

app.listen(process.env.ServerPort,()=>{
  console.log("Server is up and Running on port : "+process.env.ServerPort);
})
