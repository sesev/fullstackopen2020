import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'


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
      setSuccessMessage('You have been logged out succesfully')
      setTimeout(() => {
      setSuccessMessage(null)
    }, 5000)
    blogList()
    }
    catch (exception) {
      setErrorMessage('Logout failed')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
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

  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

  const handleBlogTitleChange = (event) => {
    setNewBlogTitle(event.target.value)
  }
  const handleBlogAuthorChange = (event) => {
    setNewBlogAuthor(event.target.value)
  }
  const handleBlogUrlChange = (event) => {
    setNewBlogUrl(event.target.value)
  }
  const blogList = () => {
    blogService
    .getAll().then(blogs =>
      setBlogs(blogs)
    )
  }
  const handleAddBlog = async (event) => {
    event.preventDefault()
    let title = newBlogTitle;
    let author = newBlogAuthor;
    let url = newBlogUrl
     try {
       await blogService.create({ title, author, url})
        setSuccessMessage(`Blog "${title}" added succesfully, written by: ${author}`)
        setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
      blogList()
     }

      catch (exception) {
      setErrorMessage('Blog post failed')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }}
   const blogForm = () => (
      <form onSubmit={handleAddBlog}>
        <div> Title:<input
          value={newBlogTitle}
          onChange={handleBlogTitleChange}
        /></div>
        <div> Author:<input value={newBlogAuthor} onChange={handleBlogAuthorChange} /></div>
        <div> Url:<input value={newBlogUrl} onChange={handleBlogUrlChange} /> </div>
        <div> <button type="submit">create</button>
        </div>
      </form>  
    ) 
  const blogsList = () => {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <div><Notification errorMessage={errorMessage} successMessage={successMessage}/></div>   
        {loginForm()}
      </div>
    )
  }else 

  return (
    <div>
      <h2>blogs</h2>
      <div><Notification errorMessage={errorMessage} successMessage={successMessage}/></div>     
      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
          {blogForm()}
          <h2>create new</h2>
          {blogs.map(blog =>  <Blog key={blog.id} blog={blog} /> )}
        </div>}

    </div>
  )
}

export default App