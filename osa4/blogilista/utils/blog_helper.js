/* const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const total = blogs.reduce((total, currentValue) => {
    return total + currentValue.likes
  }, 0)
  return total
}

const mostLikedBlog = (blogs) => {
  const most = blogs.reduce((prev, curr) =>
    prev.likes > curr.likes ? prev : curr)

  const favouriteBlog = {
    title: most.title,
    author: most.author,
    likes: most.likes
  }
  return favouriteBlog
}


const mostBlogs = (blogs) => {
  const authors = blogs.map((blog) => blog.author)

  if (!authors || authors.length === 0) {
    return null
  }

  const countBlogsByAuthor = authors.reduce((acc, curr) => {
    acc[curr] ? acc[curr]++ : (acc[curr] = 1)

    return acc
  }, {})


  const mostBlogsByAuthorArray = Object.entries(countBlogsByAuthor,).reduce((a, b) =>
    (countBlogsByAuthor[a] > countBlogsByAuthor[b] ? a : b))

  const mostBlogsByAuthor = {
    author: mostBlogsByAuthorArray[0],
    blogs: mostBlogsByAuthorArray[1],
  }

  return mostBlogsByAuthor
}

const mostLikes = (blogs) => {
  const authors = blogs.map((blog) => blog.author)
  let combinedAuthor = [...new Set(authors)]
  
  const likesByAuthor = combinedAuthor.map((author) => {
    const blogsByAuthor = blogs.filter((blog) => blog.author === author)

    const howLikedAuthor = blogsByAuthor.reduce(
      (acc, curr) => acc + curr.likes,
      0,
    )

    const totalLikesAuthor = {
      author: author,
      likes: howLikedAuthor,
    }

    return totalLikesAuthor
  })
  return likesByAuthor.reduce((a, b) => (a.likes > b.likes ? a : b))
}

module.exports = { dummy, totalLikes, mostLikedBlog, mostBlogs, mostLikes } */