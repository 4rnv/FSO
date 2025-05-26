import { useState } from 'react'
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
    display: 'flex',
    fiexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '2rem',
    border: '2px dashed black',
    marginBottom: '10px'
  }

  return (
    <div style={blogStyle} className='blog'>
      <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
      <div>
        <span>Author: {blog.author}  </span>
        <button onClick={toggleDetails}>
          {detailsVisible ? 'Hide Details' : 'Show Details'}
        </button>
      </div>
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