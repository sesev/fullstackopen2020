import React, { useState } from 'react'
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
    
    
    /* try {
      await blogService.create({ title, author, url })
      setSuccessMessage(`Blog "${title}" added succesfully, written by: ${author}.`)
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
    }
  } */
  
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

export default BlogForm