const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

/* 
blogsRouter.get('/', (request, response) => {
     Blog.find({}).then(blogs => {
      response.json(blogs.map(returnedBlog => returnedBlog.toJSON()))
    })    
  }) 
   */
  
  blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs.map((returnedBlog) => returnedBlog.toJSON()))
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
  
    const savedBlog = await blog.save()
    response.json(savedBlog.toJSON())
  })

/* 
 blogsRouter.get('/api/blogs', (request, response) => {
  const body = request.body


const blog = new Blog({
  title: body.title,
  author: body.author,
  likes: body.likes
})
console.log(blog)
blogsRouter.save()
.then(savedBlog => savedBlog.toJSON())
.then(savedAndFormattedBlog => {
  response.json(savedAndFormattedBlog)
})
.catch(error => next(error))
})  */

module.exports = blogsRouter