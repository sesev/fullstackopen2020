const listHelper = require('../utils/list_helper')
const Blog = require('../models/blog')
const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const api = supertest(app)
const blogsRouter = require('../controllers/blogs')


test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  
test('blog identifier is returned as a formatted id.', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body[0].id).toBeDefined();
})


afterAll(() => {
    mongoose.connection.close()
  })