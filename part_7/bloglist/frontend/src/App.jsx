import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/Blogform'
import blogService from './services/blogs'
import loginService from './services/login'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification, clearNotification, } from './reducers/notificationReducer'
import { initializeBlogs, createBlog, likeBlog, deleteBlogFromServer, } from './reducers/blogReducer'
import { setUser, clearUser } from './reducers/userReducer'
import Users from './components/Users'
import User from './components/User'
import { Routes, Route, Link, BrowserRouter as Router } from 'react-router-dom'
import BlogDetails from './components/BlogDetails'

const ListofBlogs = ({ blogs, user, handleLogout, addBlog, updateBlog, deleteBlog, currentUser }) => {
  return (
    <>
      <h2>Blogs</h2>
      <div className='blogs' data-testid='blogs'>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} currentUser={currentUser} />
        )}
      </div>
      <BlogForm addBlog={addBlog} />
    </>)
}

const LoginForm = ({ handleLogin, setUsername, setPassword, username, password }) => {
  return (<>
    <form id='login-form' data-testid='login-form' onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', maxWidth: 'min-content' }}>
      <label htmlFor="username">Username</label>
      <input name="username" value={username} type="text" onChange={({ target }) => setUsername(target.value)} />
      <label htmlFor="password">Password</label>
      <input name="password" value={password} type="password" onChange={({ target }) => setPassword(target.value)} />
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

const Navigation = () => {
  const style = {
    padding: '1rem',
    display: 'flex',
    gap: '1rem',
    fontSize: '1rem',
    background: '#ccc'
  }
  return (
    <div style={style}>
      <Link to='/'>Home</Link>
      <Link to='/users'>Users</Link>
      <Link to='/blogs'>Blogs</Link>
    </div>
  )
}

const App = () => {
  const blogs = useSelector((state) => state.blogs)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('loggedInUser')
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser)
      dispatch(setUser(user))
    }
    blogService.getAll().then(blogs =>
      dispatch(initializeBlogs())
    )
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      dispatch(setUser(user))
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      setUsername('')
      setPassword('')
      console.log(user)
    } catch (exception) {
      dispatch(setNotification({ message: 'Error: Wrong username or password', type: 'error', }))
      setTimeout(() => { dispatch(clearNotification()) }, 5000)
    }
  }

  const handleLogout = () => {
    dispatch(clearUser())
    window.localStorage.removeItem('loggedInUser')
  }

  const addBlog = async ({ title, author, url }) => {
    const newBlog = {
      title: title,
      author: author,
      url: url
    }
    const headers = {
      'Authorization': `Bearer ${user.token}`
    }
    await dispatch(createBlog(newBlog, headers))
    dispatch(setNotification({ message: `A new blog "${savedBlog.title}" writter by ${savedBlog.author} added by user ${user.name}`, type: 'success' }))
    setTimeout(() => { dispatch(clearNotification()) }, 5000)
  }

  const updateBlog = (updatedBlog) => {
    //setBlogs(blogs.map(blog => (blog.id === updatedBlog.id ? updatedBlog : blog)))
    dispatch(likeBlog(updatedBlog))
  }

  const handleDeleteBlog = async (blog) => {
    const headers = {
      'Authorization': `Bearer ${user.token}`
    }
    if (window.confirm(`Do you really want to delete ${blog.title} by ${blog.author}`)) {
      try {
        await dispatch(deleteBlogFromServer(blog.id, user.token))
        dispatch(setNotification({ message: `${blog.title} by ${blog.author} was successfully deleted`, type: 'success' }))
        setTimeout(() => { dispatch(clearNotification()) }, 5000)
      } catch (error) {
        dispatch(setNotification({ message: 'Error: Something went wrong', type: 'error' }))
        setTimeout(() => { dispatch(clearNotification()) }, 5000)
        console.log(error)
      }
    }
  }

  const sortByLikes = (aBlog, bBlog) => bBlog.likes - aBlog.likes

  return (
    <Router>
      <div>
        <Notification />
        <Navigation />
        <Routes>
          <Route path='/' element={user === null
            ?
            <LoginForm handleLogin={handleLogin} setUsername={setUsername} setPassword={setPassword} username={username} password={password} />
            :
            <div>
              <h2>Logged in as {user.name}</h2>
              <button onClick={handleLogout}>Logout</button>
              {user !== null && <ListofBlogs blogs={[...blogs].sort(sortByLikes)} user={user} handleLogout={handleLogout} addBlog={addBlog} updateBlog={updateBlog} deleteBlog={handleDeleteBlog} currentUser={user} />}
            </div>} />
          <Route path='/users' element={<Users />} />
          <Route path='/users/:id' element={<User />} />
          <Route path='/blogs' element={<ListofBlogs blogs={[...blogs].sort(sortByLikes)} user={user} handleLogout={handleLogout} addBlog={addBlog} updateBlog={updateBlog} deleteBlog={handleDeleteBlog} currentUser={user} />} />
          <Route path='/blogs/:id' element={<BlogDetails />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App