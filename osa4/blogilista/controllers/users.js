const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
 

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', {title: 1, author: 1 })

    response.json(users.map(u => u.toJSON()))
  })
 
usersRouter.post('/', async (request, response) => {
  const body = request.body


  if (!body.password) {
    return response.status(400).json({ error: 'you need to enter a password.'})
  }

  if (body.password.length < 4) {
    return response.status(400).json({ error: 'your password needs to bee atleast 3 characters long.'})
    }
  
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.json(savedUser)

  })

module.exports = usersRouter