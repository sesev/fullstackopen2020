const bcrypt = require('bcrypt')
const listHelper = require('../utils/list_helper')
const supertest = require('supertest')
const mongoose = require('mongoose')
const User = require('../models/user')
const app = require('../app')
const api = supertest(app)

describe('User management tests', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await listHelper.usersInDb()

    const newUser = {
      username: 'kaitsu',
      name: 'kaitsu',
      password: 'karkola',
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await listHelper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const userList = usersAtEnd.map(user => user.username)
    expect(userList).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {

    const replicateUser = {
      username: 'root',
      name: 'root',
      password: 'password',
    }

    const duplicateError = await api
      .post('/api/users')
      .send(replicateUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(duplicateError.body.error).toContain('User validation failed: username: Error, expected `username` to be unique. Value: `root`')
  })



  test('invalid users with non acceptable username or password are rejected with correct status code', async () => {
    const usersAtStart = await listHelper.usersInDb()

    const userBadUsername = {
      username: 'lo',
      name: 'Kaitsu Karkola',
      password: 'kakemies'
    }

    const userBadPassword = {
      username: 'kaitsu',
      name: 'Kaitsu Karkola',
      password: 'lo'
    }

    await api
      .post('/api/users')
      .send(userBadUsername)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    await api
      .post('/api/users')
      .send(userBadPassword)
      .expect(400)
      .expect('Content-Type', /application\/json/)


    const usersAtEnd = await listHelper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
    const usernames = usersAtEnd.map((users) => users.username)
    expect(usernames).not.toContain(userBadUsername.username)
    expect(usernames).not.toContain(userBadUsername.userBadPassword)
  })

})
afterAll(() => {
  mongoose.connection.close()
})