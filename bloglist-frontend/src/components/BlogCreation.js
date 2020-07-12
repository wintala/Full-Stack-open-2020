import React, {useState} from 'react'

const BlogCreationForm = ({addNewBlog}) => {
    const [newBlog, setNewBlog] = useState({author: "", title: "", url: ""})

    const handleCreation = event => {
        event.preventDefault()
        addNewBlog(newBlog)
      }

    return(
        <form onSubmit={handleCreation}>
            <h1>Create Blog</h1>
            <div>
            Title
                <input
                id = "title"
                type="text"
                value={newBlog.title}
                name="Title"
                onChange={({target}) => setNewBlog({...newBlog, title: target.value})}
            />
            </div>
            <div>
            Author
                <input
                id = "author"
                type="text"
                value={newBlog.author}
                name="Author"
                onChange={({target}) => setNewBlog({...newBlog, author: target.value})}
            />
            </div>
            <div>
            Url
                <input
                id = "url"
                type="text"
                value={newBlog.url}
                name="Url"
                onChange={({target}) => setNewBlog({...newBlog, url: target.value})}
            />
            </div>
            <button id="create-button" type="submit">Create</button>
        </form>    
    )
}

export default BlogCreationForm