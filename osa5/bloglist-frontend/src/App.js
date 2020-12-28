import React, { useState, useRef, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])
  const handleLogin = async (event) => {
    event.preventDefault()
    //console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setSuccessMessage('Login succeeded')
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('Wrong username or password.')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      console.log('eionnistu')
    }
  }
  const handleLogout = async (event) => {
    event.preventDefault()
    try {
      window.localStorage.removeItem('loggedBloglistUser')
      setSuccessMessage('You have been logged out succesfully.')
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
      setTimeout(() => {
        refreshPage()
      }, 500)
    }
    catch (exception) {

    }
  }

  function refreshPage() {
    window.location.reload();
  }
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

const handleAddBlog = (blogObject) => {
  blogFormRef.current.toggleVisibility()
  blogService
  .create(blogObject)
  .then(returnedBlog => {
    if (returnedBlog.status === 400){
    throw new Error('Creating a new blog failed!')}
    setBlogs(blogs.concat(returnedBlog))
  })
  .then(setSuccessMessage(`Blog '${blogObject.title}' added succesfully, written by: ${blogObject.author}`))
  .then(setTimeout(() => {
    setSuccessMessage(null)
  }, 3000))
  .catch(exception => {
      setErrorMessage('Adding a new blog failed.')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
      console.log('eionnistu')
  })
}
const blogFormRef = useRef()

const blogForm = () => (
  <Togglable buttonLabel='new blog' ref={blogFormRef}>
  <BlogForm createBlog={handleAddBlog} />
</Togglable>
)

const blogList = () => (
    blogs.map(blog => 
          <Blog key={blog.id} blog={blog} /> 
)
)



  return (
    <div>
      <h2>blogs</h2>
      <div><Notification errorMessage={errorMessage} successMessage={successMessage} /></div>
      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
          <h2>create new</h2>
          {blogForm()}
          {blogList()}
        </div>}

    </div>
  )
}

export default App