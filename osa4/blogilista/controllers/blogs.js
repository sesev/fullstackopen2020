const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


blogsRouter.get('/', (request, response) => {
    Blog.find({}).then(blogs => {
      console.log(blogs)
      response.json(blogs.map(blog => blog.toJSON()))
    })
  })


/* blogsRouter.get('/api/blogs', (request, response) => {
  const body = request.body


const blog = new Blog({
  title: body.title,
  author: body.author,
  likes: body.likes
})

blogsRouter.save()
.then(savedBlog => savedBlog.toJSON())
.then(savedAndFormattedBlog => {
  response.json(savedAndFormattedBlog)
})
.catch(error => next(error))
}) */

module.exports = blogsRouter