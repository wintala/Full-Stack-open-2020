import React, {useState} from 'react'
import PropTypes from 'prop-types'



const Blog = ({ blog, likeFunction, delteFunction, user }) => {
  const [fullDetails, setFulldetails] = useState(false)
  
  const buttonText = fullDetails ? "hide info" : "info"
  const blogdetails = fullDetails ?
  <div>
    <h4>{blog.title}</h4> 
    {blog.author}
    <br/>
    {blog.url}
    <br/>
    Likes: {blog.likes}
    <button id="like-button" onClick= {() => likeFunction(blog)}>like</button>
    <br/>
    {blog.user.name}
    <br/>
    {user ? <button id="delete-button" onClick={() => delteFunction(blog)}>Delete</button> : null}
  </div>
  : 
  <>
    {blog.title} {blog.author}
  </>

  return(
    <div id="blog">
      {blogdetails} 
      <button id="info-button" onClick = {() => setFulldetails(!fullDetails)}>
        {buttonText}
      </button>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired
}

export default Blog
