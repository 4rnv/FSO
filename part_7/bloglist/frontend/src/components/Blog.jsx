import { useState } from 'react'
import blogService from '../services/blogs'
import { Link } from 'react-router-dom'

const Blog = ({ blog, updateBlog, deleteBlog, currentUser }) => {
  const [detailsVisible, setDetailsVisible] = useState(false)

  const toggleDetails = () => {
    setDetailsVisible(!detailsVisible)
  }

  const handleLike = async () => {
    const updatedBlog = {
      ...blog,
    }
    updateBlog(updatedBlog)
  }

  const blogStyle = {
    padding: '1rem',
    border: '1px solid green',
    marginBottom: '10px'
  }

  return (
    <div style={blogStyle} className='blog'>
      <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
      <span>Author: </span><span>{blog.author}</span>
      <button onClick={toggleDetails}>
        {detailsVisible ? 'Hide Details' : 'Show Details'}
      </button>
      {detailsVisible && (
        <div>
          <p>URL: {blog.url}</p>
          <p className='likes'>Likes: {blog.likes}</p><button onClick={handleLike}>Like</button>
          <p>Added by: {blog.user ? blog.user.name : 'Anonymous'}</p>
          {currentUser.username === blog.user?.username && (
            <button onClick={() => deleteBlog(blog)}>Delete</button>
          )}
        </div>
      )}
    </div>
  )
}

export default Blog