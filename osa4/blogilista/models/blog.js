
const mongoose = require('mongoose')


const blogSchema = new mongoose.Schema({
    title: {type: String, required: true},
    author: {type: String, required: true},
    url: {type: String, required: true},
    likes: {type: Number, required: false, default: 0}
  })
  
blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      const returnedBlog = returnedObject;
      returnedBlog.id = returnedBlog._id.toString()
      delete returnedBlog._id
      delete returnedBlog.__v
    }
  })
  
  module.exports = mongoose.model('Blog', blogSchema)