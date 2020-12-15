const Blog = require('../models/blog')
const User = require('../models/user')



const dummy = (blogs) => {
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



const blogList = [
  {
    id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}



module.exports = { dummy, totalLikes, mostLikedBlog, mostBlogs, mostLikes, blogsInDb, blogList, usersInDb }