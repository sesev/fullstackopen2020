const listHelper = require('../utils/list_helper')
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const api = supertest(app)

const testBlogs = [
  {
    _id: '5fd63eeef1f5443e30aeffcb',
    title: 	"Type wars",
    author: 	"Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0,
  },
  {
    _id: "5fd63ecef1f5443e30aeffc8",
    title: 	"Canonical string reduction",
    author: 	"Edsger W. Dijkstra",
    url: 	"http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
  },
]

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = testBlogs.map((blog) => new Blog(blog))
  const promiseArray = blogObjects.map((blog) => blog.save())
  await Promise.all(promiseArray)
})

let token = null

beforeAll(async () => {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('karkola', 10)
  const user = new User({ username: 'kaitsu', passwordHash })

  await user.save()
  await api
    .post('/api/login')
    .send({ username: 'kaitsu', password: 'karkola' })
    .then((respond) => {
      return (token = respond.body.token)
    })
  return token
})

describe('Accessing blogs', () => {

//4.8
  test('Blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

//4.9
test('Blog identifier is returned as a formatted id.', async () => {
  const response = await api.get('/api/blogs');
  expect(response.body[0].id).toBeDefined();
})

//4.10
test('A valid blog can be added with token', async () => {

  const newBlog = {
    title: 'API testiblog',
    author: 'Kaitsu Karkola',
    url: 'http://www.kaitsunparatiisi.com',
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await listHelper.blogsInDb()
  const titles = blogsAtEnd.map((blog) => blog.title)

  expect(titles).toContain('API testiblog')
})
//4.13
test('Receives OK status when deleting a blog with token', async () => {

  const deleteBlog = {
    title: 'This blog to be deleted',
    author: 'Kaitsu Karkola',
    url: 'http://deletethisblog.com',
  }


  await api
  .post('/api/blogs')
  .set('Authorization', `bearer ${token}`)
  .send(deleteBlog)
  .expect(200)
  .expect('Content-Type', /application\/json/);

const blogsAtEnd = await listHelper.blogsInDb()
const titles = blogsAtEnd.map((blog) => blog.title)

expect(titles).not.toContain('API testiblog')

})
//4.14
test('Editing likes of an existing blog', async () => {
  const updatedBlogLikes = {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 666,
  }

  const blogsAtStart = await listHelper.blogsInDb()
  await api
    .put(`/api/blogs/${blogsAtStart[0].id}`)
    .set('Authorization', `bearer ${token}`)
    .send(updatedBlogLikes)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await listHelper.blogsInDb()
  const contents = blogsAtEnd.map(n => n.likes)
  expect(contents).toContain(updatedBlogLikes.likes)
})
})

describe('Checks that blogs are formed right', () => {

describe('viewing a specific note', () => {
//4.11
test('If blog has no likes value added, set likes to 0.', async () => {
  const noLikesBlog = {
    title: 'A Blog Nobody loved',
    author: 'Kaitsu Karkola',
    url: 'http://onewithoutlove.com',
  }
  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(noLikesBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await listHelper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(testBlogs.length + 1)
  expect(blogsAtEnd[testBlogs.length].likes).toEqual(0)
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
    .set('Authorization', `bearer ${token}`)
    .send(noTitleBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/);

  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(noUrlBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/);
})
})

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
afterAll(() => {
  mongoose.connection.close();
})