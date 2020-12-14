const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

  blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs.map((returnedBlog) => returnedBlog.toJSON()))
  })

  blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
      response.json(blog.toJSON())
    } else {
      response.status(404).end()
    }
  })

blogsRouter.post('/', async (request, response, next) => {
    const body = request.body
  
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes
    })
    try {     
      const savedBlog = await blog.save()
      response.json(savedBlog.toJSON())  }
      catch(exception)
      {
      next(exception)
    }
 
  })

module.exports = blogsRouter