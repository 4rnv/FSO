import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import PropTypes from 'prop-types'

const ListofBlogs = ( { blogs, user, handleLogout, addBlog, updateBlog, deleteBlog } ) => {
  return (
  <>
  <h2>Logged in as {user.name}</h2>
  <button onClick={handleLogout}>Logout</button>
  <h2>Blogs</h2>
  {blogs.map(blog =>
    <Blog key={blog.id} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog}/>
  )}
  <BlogForm addBlog={addBlog}/>
  </>)
}

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
      <input name="title" required value={title} type="text" onChange={({ target }) => setTitle(target.value)} />
      <label htmlFor="author">Author</label>
      <input name="author" required value={author} type="text" onChange={({ target }) => setAuthor(target.value)} />
      <label htmlFor="url">URL</label>
      <input name="url" required value={url} type="text" onChange={({ target }) => setUrl(target.value)} />
      <button type="submit">Add Blog</button>
      <button onClick={() => setBlogFormVisible(false)}>cancel</button>
    </form>
    </div>
    </>
  )
}

const LoginForm = ({ handleLogin,setUsername, setPassword, username,password }) => {
  return (<>
  <form onSubmit={handleLogin} style={{ display:'flex',flexDirection:'column',maxWidth:'min-content' }}>
        <label htmlFor="username">Username</label>
        <input name="username" value={username} type="text" onChange={({ target }) => setUsername(target.value)}/>
        <label htmlFor="password">Password</label>
        <input name="password" value={password} type="password" onChange={({ target }) => setPassword(target.value)}/>
        <button type="submit">login</button>
  </form>
  </>)
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('loggedInUser')
    if(loggedInUser) {
      const user = JSON.parse(loggedInUser)
      setUser(user)
    }
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username,password })
      setUser(user)
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      setUsername('')
      setPassword('')
      console.log(user)
    } catch (exception) {
      setMessage('Error: Wrong username or password')
      setTimeout(() => {setMessage(null)}, 5000)
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedInUser')
  }

  const addBlog = async ({ title,author,url }) => {
    const newBlog = {
      title: title,
      author: author,
      url: url
    }
    const headers = {
      'Authorization': `Bearer ${user.token}`
    }
    const savedBlog = await blogService.createBlog(newBlog,headers)
    setBlogs(blogs.concat(savedBlog))
    setMessage(`A new blog "${savedBlog.title}" writter by ${savedBlog.author} added by user ${user.name}`)
    setTimeout(() => {setMessage(null)}, 5000)
  }

  const updateBlog = (updatedBlog) => {
    setBlogs(blogs.map(blog => (blog.id === updatedBlog.id ? updatedBlog : blog)))
  }

  const deleteBlog = async (blog) => {
    const headers = {
      'Authorization': `Bearer ${user.token}`
    }
    if(window.confirm(`Do you really want to delete ${blog.title} by ${blog.author}`)) {
      try {
        const response = await blogService.deleteBlog(blog.id, headers)
        setBlogs(blogs.filter(b => b.id !== blog.id))
        setMessage(`${blog.title} by ${blog.author} was successfully deleted`)
        setTimeout(() => {setMessage(null)}, 5000)
      } catch (error) {
        setMessage('Error: Something went wrong')
        setTimeout(() => {setMessage(null)}, 5000)
        console.log(error)
      }
    }
  }

  const sortByLikes = (aBlog,bBlog) => bBlog.likes - aBlog.likes

  return (
    <div>
      <Notification message={message} type={message && message.toLowerCase().includes('error') ? 'error' : 'non-error'} />
      {user===null && <LoginForm handleLogin={handleLogin} setUsername={setUsername} setPassword={setPassword} username={username} password={password}/>}
      {user!==null && <ListofBlogs blogs={blogs.sort(sortByLikes)} user={user} handleLogout={handleLogout} addBlog={addBlog} updateBlog={updateBlog} deleteBlog={deleteBlog}/>}
    </div>
  )
}

export default App