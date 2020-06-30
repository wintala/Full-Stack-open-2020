const Blog = require("../models/blog");

const testBlogs = [
    {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7
      },
      {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url:
          "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5
      }
]


const getBlogsFromDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map(x => x.toJSON());
}

module.exports = {
  getBlogsFromDb,
  testBlogs
}
