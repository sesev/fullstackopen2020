const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (_request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs.map((blog) => blog.toJSON()))
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findOne({ _id: request.params.id }).populate('user', { username: 1, name: 1 })
  if (blog) {
    response.json(blog.toJSON())
  }
  else {
    response.status(404).end()
  }
})


blogsRouter.post('/', async (request, response, next) => {
  const body = request.body

  if (!request.token) {
    return response.status(401).json({ error: 'token is missing!' })
  }
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id
    })
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.json(savedBlog.toJSON())
  }
  catch (error) {
    return next(response.status(400).json({ error: 'Token is invalid!' }))}
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    const blog = await Blog.findOne({ _id: request.params.id })
    if (!request.token || decodedToken.id.toString() !== blog.user._id.toString()) {
      return  response.status(401).json({ error: 'User is not permitted to delete this blog.' })
    }
    await Blog.findByIdAndRemove(request.params.id)
    return response.status(202).json({ success: 'Blog was deleted succesfully.' }).end()
  }
  catch (error) {
    return next(response.status(401).json({ error: 'Token is invalid or blog was already deleted!' }))}

})

blogsRouter.put('/:id', async (request, response, next) => {
  const { title, author, url, likes } = request.body
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    const blogedit = await Blog.findOne({ _id: request.params.id })

    if (!request.token || decodedToken.id.toString() !== blogedit.user._id.toString()) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }


    if (!title || !url) {
      return response.status(400).json({ error: 'Title or URL is missing' })
    }

    const blog = { title, author, url, likes }
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
      new: true
    })

    if (!updatedBlog) {
      return response.status(400).end()
    }

    return response.status(200).json(updatedBlog)
  }
  catch (error) {
    return next(response.status(401).json({ error: 'Token is invalid!' }))}
})

module.exports = blogsRouter