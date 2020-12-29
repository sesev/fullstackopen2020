import React, { useState } from 'react'
import blogService from '../services/blogs'
const Blog = ({ blog, handleRemoveBlog, bloguser }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  

  const [visible, setVisible] = useState(false)
  const blogMoreInfo = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const [likes, setLikes] = useState(blog.likes)

  const addLikeBlog = async event => {
    event.preventDefault()
    const likedBlog = { ...blog }
    likedBlog.user = blog.user.id
    likedBlog.likes = likes + 1
    setLikes(likes + 1)
    await blogService.update(likedBlog.id, likedBlog)
  }

  return (
    <div style={blogStyle}>
 <div>
    {blog.title} - {blog.author}   <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
    <div style={blogMoreInfo}>
      <div>{blog.url}</div>
      <div> Likes: {blog.likes} <button onClick={addLikeBlog}>like</button></div>
      <div> Creator: {blog.user.name}</div>
      {bloguser === blog.user.username ? 
      (      
      <button id="delete" onClick={klik => handleRemoveBlog(klik, blog)}>DELETE</button>
      ) 
      :
       null}
    </div>
  </div>
  </div>
  
)}

export default Blog
