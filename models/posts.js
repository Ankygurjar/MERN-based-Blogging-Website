const mongoose= require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new Schema({
  title:{
    type:String,
    required:true
  },
  category:{
    type:String,
    required:true
  },
  description:{
    type:String,
    required:true
  },
  authorId:{
    type: String,
    required: true
  },
  author:{
    type:String
  },
  date:{
    type: Date,
    default: Date.now
  }
})

const Post = module.exports = mongoose.model('posts',PostSchema);
