import { useState, useEffect } from 'react'

const BlogForm = ({ addBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [blogFormVisible, setBlogFormVisible] = useState(false)
  const blogButtonHide = { display: blogFormVisible ? 'none' : '' }
  const blogShow = { display: blogFormVisible ? '' : 'none' }

  const handleSubmit = (event) => {
    event.preventDefault()
    addBlog({ title,author,url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <>
    <button style={blogButtonHide} onClick={() => setBlogFormVisible(true)}>Create New Blog</button>
    <div style={blogShow}>
    <form onSubmit={handleSubmit} style={{ display:'flex',flexDirection:'column',maxWidth:'min-content' }}>
      <label htmlFor="title">Title</label>
      <input id="title" name="title" required value={title} type="text" onChange={({ target }) => setTitle(target.value)} />
      <label htmlFor="author">Author</label>
      <input id="author" name="author" required value={author} type="text" onChange={({ target }) => setAuthor(target.value)} />
      <label htmlFor="url">URL</label>
      <input id="url" name="url" required value={url} type="text" onChange={({ target }) => setUrl(target.value)} />
      <button type="submit">Add Blog</button>
      <button onClick={() => setBlogFormVisible(false)}>cancel</button>
    </form>
    </div>
    </>
  )
}


export default BlogForm