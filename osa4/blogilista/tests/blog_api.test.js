const listHelper = require('../utils/list_helper')
const Blog = require('../models/blog')
const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const api = supertest(app)
const blogsRouter = require('../controllers/blogs')


beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = initialBlogs.map((blog) => new Blog(blog))
  const promiseArray = blogObjects.map((blog) => blog.save())
  await Promise.all(promiseArray)
})


const initialBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
]
//4.8
test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

//4.9
test('blog identifier is returned as a formatted id.', async () => {
  const response = await api.get('/api/blogs');
  expect(response.body[0].id).toBeDefined();
})

//4.10
test('a valid blog can be added ', async () => {
  const newBlog = {
    title: "This is test blog",
    author: "Kaitsu Karkola",
    url: "http://www.google.com",
    likes: 10
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)
  const blogsAtEnd = await listHelper.blogsInDb()
  expect(blogsAtEnd.length).toBe(initialBlogs.length + 1)
  const title = blogsAtEnd.map(n => n.title)
  expect(title).toContain('This is test blog')
})

//4.11
test('if blog has no likes value added, set likes to 0.', async () => {
  const noLikesBlog = {
    title: 'A Blog Nobody loved',
    author: 'Kaitsu Karkola',
    url: 'http://onewithoutlove.com',
  }

  await api
    .post('/api/blogs')
    .send(noLikesBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await listHelper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1)
  expect(blogsAtEnd[initialBlogs.length].likes).toEqual("0")
})



//Get blog by id 
describe('viewing a specific note', () => {

  test('succeeds with a valid id', async () => {
    const blogsAtStart = await listHelper.blogsInDb()

    const blogToView = blogsAtStart[0]

    const resultBlog = await api
      .get(`/api/notes/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(resultBlog.body).toEqual(blogToView)
  })
})
afterAll(() => {
  mongoose.connection.close()
})