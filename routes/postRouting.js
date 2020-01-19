const express = require('express');
const postRouter = express.Router();

const Model = require('../models/posts')

postRouter.get('/',(req, res)=>{
  Model.find()
    .then(posts=>{
      res.json(posts)
    })
    .catch(err=>{
      res.status(400).json('Error while fetching all the posts!')
    })
})

postRouter.post('/add', (req, res)=>{
  const post = {
    title: req.body.title,
    author: req.body.author,
    authorId: req.body.authorId,
    category: req.body.category,
    description: req.body.description
  }
  if(!post.title || !post.category || !post.description){
    res.status(400).json('Please enter all the fields Properly..')
  }
  else{
    Model.create(post)
      .then((post)=>{
        return res.status(200).json(post);
      })
      .catch(err=>{
        res.status(400).json(err);
      })
  }
})

postRouter.get('/:id', (req, res)=>{
  const id = req.params.id;
  Model.findById(id)
    .then(post=>{
      res.status(200).json(post)
    })
    .catch(err=>{
      res.status(400).json(err)
    })
})

postRouter.put('/:id', (req, res)=>{
  const id = req.params.id;
  const updatePost = {
    title: req.body.title,
    author: req.body.author,
    category: req.body.category,
    description: req.body.description
  }

  Model.findOneAndUpdate(id, updatePost)
    .then((post)=>{
      res.status(200).json(post)
    })
    .catch(err=>{
      res.status(400).json(err)
    })
})

postRouter.post('/myPosts', (req, res)=>{
  var author = req.body.author
  console.log(author)
  Model.find({
    author: author
  })
    .then(posts=>{
      res.json(posts)
    })
    .catch(err=>{
      res.json(err)
    })
})

postRouter.delete('/:id',(req, res)=>{
  const id = req.params.id;
  Model.findByIdAndDelete(id)
    .then(()=>{
      res.json('Deleted')
    })
    .catch(err=>{
      console.log(err)
    })
})

module.exports = postRouter
