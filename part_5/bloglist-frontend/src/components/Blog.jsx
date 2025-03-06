import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, updateBlog, deleteBlog, currentUser }) => {
  const [detailsVisible, setDetailsVisible] = useState(false)
  const [blogObject, setBlogObject] = useState(blog)

  const toggleDetails = () => {
    setDetailsVisible(!detailsVisible)
  }

  const handleLike = async () => {
    const updatedBlog = {
      // ...blogObject,
      // likes: blogObject.likes + 1
      ...blog,
      likes: blog.likes + 1
    }

    try {
      const response = await blogService.updateBlog(blog.id, updatedBlog)
      setBlogObject(updatedBlog)
      updateBlog(updatedBlog)
    } catch (error) {
      console.error('Failed to like the blog:', error)
    }
  }

  const blogStyle = {
    padding: '1rem',
    border: '1px solid green',
    marginBottom: '10px'
  }

  return (
    <div style={blogStyle} className='blog'>
      <strong>{blog.title} </strong>
      <span>Author: </span><span>{blog.author}</span>
      <button onClick={toggleDetails}>
        {detailsVisible ? 'Hide Details' : 'Show Details'}
      </button>
      {detailsVisible && (
        <div>
          <p>URL: {blog.url}</p>
          <p className='likes'>Likes: {blogObject.likes}</p><button onClick={handleLike}>Like</button>
          <p>Added by: {blogObject.user ? blogObject.user.name : 'Anonymous'}</p>
          {currentUser.username === blogObject.user.username && (
            <button onClick={() => deleteBlog(blog)}>Delete</button>
          )}
        </div>
      )}
    </div>
  )
}

export default Blog