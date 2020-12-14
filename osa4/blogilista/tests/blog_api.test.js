const listHelper = require('../utils/list_helper')
const Blog = require('../models/blog')
const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const api = supertest(app)

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
describe('When there is initially some blogs saved', () => {

  beforeEach(async () => {
    await Blog.deleteMany({})
  
    const blogObjects = initialBlogs.map((blog) => new Blog(blog))
    const promiseArray = blogObjects.map((blog) => blog.save())
    await Promise.all(promiseArray)
  })

  test('Blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

//4.9
test('Blog identifier is returned as a formatted id.', async () => {
  const response = await api.get('/api/blogs');
  expect(response.body[0].id).toBeDefined();
})
})
//4.10
describe('Checks that blogs are formed right', () => {

  beforeEach(async () => {
    await Blog.deleteMany({})
  
    const blogObjects = initialBlogs.map((blog) => new Blog(blog))
    const promiseArray = blogObjects.map((blog) => blog.save())
    await Promise.all(promiseArray)
  })
test('A valid blog can be added ', async () => {
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
  const title = blogsAtEnd.map(res => res.title)
  expect(title).toContain('This is test blog')
})

//4.11
test('If blog has no likes value added, set likes to 0.', async () => {
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
  expect(blogsAtEnd[initialBlogs.length].likes).toEqual(0)
})
//4.12
test('If blog has no title or url, respond code is status 400 bad request.', async () => {
  const noTitleBlog = {
    author: 'Kaitsu Karkola',
    url: 'http://onewithouttitle.com',
    likes: '10'
  }
  const noUrlBlog = {
    title: 'The blog without url',
    author: 'Kaitsu Karkola',
    likes: '10'
  }
  await api
    .post('/api/blogs')
    .send(noTitleBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/);

  await api
    .post('/api/blogs')
    .send(noUrlBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/);
})
})

//Get blog by id 
describe('viewing a specific note', () => {

  test('Has to succeed with a valid ID.', async () => {
    const blogsAtStart = await listHelper.blogsInDb()

    const blogToView = blogsAtStart[0]

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    expect(resultBlog.body).toEqual(blogToView)
  })
  

  test('Has to fail with statuscode 404 if ID is valid but non-existing.', async () => {
    const validNonexistingId = '5a422a851b54a676234d17f6'

    console.log(validNonexistingId)

    await api
      .get(`/api/blogs/${validNonexistingId}`)
      .expect(404)
      return
  })

    test('Has to fail with statuscode 400 if ID is in invalid form.', async () => {
    const invalidId = '5a3d5da59070081a82a3445'
    await api
      .get(`/api/blogs/${invalidId}`)
      .expect(400)
      return
  })  
})
describe('manipulating a blog', () => {
test('Has to succeed if blog ID is valid.', async () => {
  const blogsAtBeginning = await listHelper.blogsInDb();
  const blogToDelete= blogsAtBeginning[0];

  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);
  const blogsAtEnd = await listHelper.blogsInDb();

  const titles = blogsAtEnd.map((blog) => blog.title);
  expect(titles).not.toContain(blogToDelete.title);
})
})




afterAll(() => {
  mongoose.connection.close()
})