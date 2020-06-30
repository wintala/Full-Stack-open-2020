var _ = require('lodash')


const listWithOneBlog = [
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url:
      "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
];

const listWithManyBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url:
      "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url:
      "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0,
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url:
      "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0,
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0,
  },
];


const dummy = (blogs) => {
    return 1
  }

const totalLikes = blogs => (blogs.length === 0) ? 0 : blogs.map(x => x.likes).reduce((sum, current) => sum + current)


const favoriteBlog = blogs => {

  const favorite = blogs.filter(x => x.likes === Math.max(...blogs.map(y => y.likes)))[0]

  if (blogs.length !== 0) {
    return {title: favorite.title,
            author: favorite.author,
            likes: favorite.likes}
  } else {return null}
}


const authorWithMostBlogs = blogs => {
  const authorList = blogs.map(x => x.author)
  const authorAndcount = _(authorList).countBy().entries().maxBy(_.last);
  if (blogs.length !== 0) {
    return {author: authorAndcount[0], blogs: authorAndcount[1]}
  } else {return null}
}


const authorWithMostLikes = blogs => {
  const authtorSet = new Set(blogs.map(x => x.author))
  const authorsLikes = {}

  const getAuthorLikes = (author) => {
    const authorsBlogs = blogs.filter(post => post.author === author)
    const likes = authorsBlogs.map(x => x.likes).reduce((sum, current) => sum + current)
    return likes
  }
  
  authtorSet.forEach(x => {authorsLikes[x] = getAuthorLikes(x)})
  authorAndLikes = _(authorsLikes).entries().maxBy(_.last) //tuple with name of the most liked authors as first element and his likes as second element
  
  if (blogs.length !== 0) {
    return {author: authorAndLikes[0], likes: authorAndLikes[1]}
  } else {return null}
}



module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  authorWithMostBlogs,
  authorWithMostLikes,
  listWithManyBlogs,
  listWithOneBlog
}