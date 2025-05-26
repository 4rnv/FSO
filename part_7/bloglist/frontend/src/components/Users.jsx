import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { initializeUsers } from "../reducers/usersReducer"
import { Link } from 'react-router-dom'
//import User from './User'

const Users = () => {
    const dispatch = useDispatch()
    const users = useSelector((state) => state.users)

    useEffect(() => {
        dispatch(initializeUsers())
    }, [])

    return (
<table border="1" cellPadding="8" style={{ borderCollapse: 'collapse', width: '100%' }}>
      <thead>
        <tr>
          <th>User ID</th>
          <th>Username</th>
          <th>Blogs Created</th>
          <th>Blog Titles</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <Link to={`/users/${user.id}`}>{user.username}</Link>
            <td>{user.blogs.length}</td>
            <td>
              {user.blogs.length > 0 ? (
                <ul style={{ margin: 0 }}>
                  {user.blogs.map((blog) => (
                    <li key={blog.id}>{blog.title}</li>
                  ))}
                </ul>
              ) : (
                <i>No blogs created.</i>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    )
}

export default Users