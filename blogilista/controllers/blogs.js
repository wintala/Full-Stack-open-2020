const blogsRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate("user", {blogs: 0})
    response.json(blogs)
})

  
blogsRouter.post('/', async (request, response, next) => {
  const body = request.body
  const token = request.token

  
  if(!body.title|| !body.url) { // teht 4.12, en tiedä oliko ideana käyttää mongoosen validaatiota
    
    return response.status(400).json({error: "bad request"})
  }

  let decodedToken;
  try{
    decodedToken = jwt.verify(token, process.env.SECRET)
  } catch (err) {return next(err)}

  if (!token || !decodedToken.id) {
    console.log('2');
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)

  const newBlog = new Blog({
    title: body.title,
    url: body.url,
    author: body.author,
    likes: (body.likes===undefined) ? 0 : body.likes,
    user: user._id
  })

  const savedBlog = await newBlog.save()

  user.blogs = user.blogs.concat(newBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

// testattu postmanilla
blogsRouter.delete('/:id', async (request, response, next) => {
  const token = request.token
  
  let decodedToken;
  try{
    decodedToken = jwt.verify(token, process.env.SECRET)
  } catch (err) {return next(err)}

  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)

  user.blogs = user.blogs.filter(x => x._id.toString() !== request.params.id)
  await user.save()

  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

// testattu postmanilla
blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const newBlog = {
    title: body.title,
    url: body.url,
    author: body.author,
    likes: (body.likes===undefined) ? 0 : body.likes,
    user: body.user.id
  }
  

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, newBlog, { new: true })
  response.json(updatedBlog.toJSON())
})

  

module.exports = blogsRouter