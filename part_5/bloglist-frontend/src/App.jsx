import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const ListofBlogs = ({blogs, user, handleLogout, addBlog}) => {
  return (
  <>
  <h2>Logged in as {user.name}</h2>
  <button onClick={handleLogout}>Logout</button>
  <h2>Blogs</h2>
  {blogs.map(blog =>
    <Blog key={blog.id} blog={blog} />
  )}
  <BlogForm addBlog={addBlog}/>
  </>)
}

const BlogForm = ({ addBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    addBlog({title,author,url})
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={handleSubmit} style={{ display:'flex',flexDirection:'column',maxWidth:'min-content' }}>
      <label htmlFor="title">Title</label>
      <input name="title" value={title} type="text" onChange={({ target }) => setTitle(target.value)} />
      <label htmlFor="author">Author</label>
      <input name="author" value={author} type="text" onChange={({ target }) => setAuthor(target.value)} />
      <label htmlFor="url">URL</label>
      <input name="url" value={url} type="text" onChange={({ target }) => setUrl(target.value)} />
      <button type="submit">Add Blog</button>
    </form>
  )
}

const LoginForm = ({handleLogin,setUsername, setPassword, username,password}) => {
  return (<>
  <form onSubmit={handleLogin} style={{display:'flex',flexDirection:'column',maxWidth:'min-content'}}>
        <label htmlFor="username">Username</label>
        <input name="username" value={username} type="text" onChange={({target})=> setUsername(target.value)}/>
        <label htmlFor="password">Password</label>
        <input name="password" value={password} type="password" onChange={({target})=> setPassword(target.value)}/>
        <button type="submit">login</button>
  </form>
  </>)
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
      const user = await loginService.login({username,password})
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

  const addBlog = async ({title,author,url}) => {
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

  return (
    <div>
      <Notification message={message} type={message && message.toLowerCase().includes('error') ? 'error' : 'non-error'} />
      {user===null && <LoginForm handleLogin={handleLogin} setUsername={setUsername} setPassword={setPassword} username={username} password={password}/>}
      {user!==null && <ListofBlogs blogs={blogs} user={user} handleLogout={handleLogout} addBlog={addBlog}/>}
    </div>
  )
}

export default App