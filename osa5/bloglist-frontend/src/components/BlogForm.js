import React, { useState } from 'react'
import PropTypes from 'prop-types'
const BlogForm = ( { createBlog }) => {
  
  
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
  const handleAddBlog = async (event) => {
    event.preventDefault()
    await createBlog({ 
       title: newBlogTitle,
       author: newBlogAuthor,
       url: newBlogUrl
    })
   }
       
  return (

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
  )}

  BlogForm.propTypes = {
    createBlog: PropTypes.func.isRequired
  }

export default BlogForm