const express = require('express')
const userRouter = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Model = require('../models/users')

process.env.SECRET_KEY = 'topSecret'

userRouter.get('/',(req, res)=>{
  Model.find()
    .then(users=>{
      res.status(200).json(users)
    })
})

userRouter.post('/signup', (req, res)=>{
  const newUser = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  }
  Model.findOne({
    email: req.body.email
  })
    .then(user=>{
      res.json(user)
      if(!user){
        bcrypt.hash(req.body.password, 10, (err, hash)=>{
          newUser.password = hash;
          Model.create(newUser)
            .then(user=>{
              res.status(200).json(user)
            })
            .catch(err=>{
              res.status(400).json(err)
            })
        })
      }else{
        res.status(400).json('User with this Email or Username is already exist!!')
      }
    })
    .catch(err=>{
      res.status(400).json(err)
    })
})

userRouter.post('/login', (req, res)=>{
  Model.findOne({
    email: req.body.email
  })
    .then(user=>{
      if(user){
        if(bcrypt.compareSync(req.body.password, user.password)){
          const payload = {
            _id: user._id,
            name:user.name,
            email: user.email
          }
          var token = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: 86400})
          return res.status(200).json('token : '+token)
        }else{
          res.status(400).json('Invalid Password')
        }
      }else{
        res.status(400).json('User with this email does not exist!!')
      }
    })
    .catch(err=>{
      res.status(400).json(err)
    })
})

userRouter.get('/profile', (req, res)=>{
  var token = req.headers['x-access-token'];
  jwt.verify(token, process.env.SECRET_KEY)
    .then(user=>{
      res.status(200).json(user)
    })
    .catch(err=>{
      res.status(400).json(err)
    })
  Model.findOne({
  _id: decoded._id
})
.then(user => {
  if(user){
    res.json(user)
  }else{
    res.send("User does not exist")
  }
})
.catch(err=>{
  res.send({error: + err})
})
})

module.exports = userRouter;
