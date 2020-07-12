import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogCreationForm from './components/BlogCreation'
import blogService from './services/blogs'
import LoginForm from './components/Login'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [renderBlogs, setRenderBlogs] = useState(false)

  const blogFormRef = useRef()

  // renderöidään kaikki blogit uuden blogin luomisen tai blobista tykkäämisen jälkeen
  useEffect(() => {
    blogService.getAll().then(blogs => {
      const sortedBlogs = [...blogs].sort((a, b) => (b.likes - a.likes))
      setBlogs(sortedBlogs)
    })
    
    return(() => setRenderBlogs(false))
  }, [renderBlogs])


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedInUser', JSON.stringify(user)
      ) 

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {setMessage('Wrong username or password')}
  }

  const addNewBlog = async (blog) => {
    await blogService.createBlog(blog, user.token)
    blogFormRef.current.toggleVisibility()
    setRenderBlogs(true)
    setMessage(`Added ${blog.title} by ${blog.author}`)
  }

  const likeBlog = async (blog) => {
    const newBlog = {...blog, likes: blog.likes + 1}
    await blogService.update(blog.id, newBlog)
    setRenderBlogs(true)

  }

  const deleteBlog = async blog => {
    const id = blog.id
    if (window.confirm(`Delete ${blog.title} by ${blog.author}?`)) {
    await blogService.deleteBlog(id, user.token)
    setBlogs(blogs.filter(x => x.id !== id))
    }
  }
  
  
  return (
    <div>
      <Notification text = {message} setMessage = {setMessage} />
      {!user ?
      <LoginForm {...{handleLogin, setUsername, setPassword, username, password}}/> : 
      <div>
        Logged in {user.username} <button onClick={() => {window.localStorage.clear(); setUser(null)}}>Log out</button>
        <h2>blogs</h2>
        {blogs.map(blog => <Blog key = {blog.id} blog = {blog} likeFunction = {likeBlog} delteFunction = {deleteBlog} user={user}/>)}
        <Togglable buttonLabel="add new blog" ref = {blogFormRef} >
          <BlogCreationForm addNewBlog = {addNewBlog} user = {user} />
        </Togglable>
      </div>
      }
    </div>
  )
}

export default App