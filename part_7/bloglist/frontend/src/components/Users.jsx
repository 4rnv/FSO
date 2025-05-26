import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { initializeUsers } from "../reducers/usersReducer"
import { Link } from 'react-router-dom'
import { Container, Table } from 'react-bootstrap'

const Users = () => {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.users)

  useEffect(() => {
    dispatch(initializeUsers())
  }, [])

  return (
    <Container className="pt-4" style={{ fontSize: '1.2rem' }}>
      <h1>Users</h1>
      <Table responsive borderless className="mt-4" style={{ fontSize: '1.2rem' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #000' }}>
            <th>ID</th>
            <th>Username</th>
            <th>Blogs Created</th>
            <th>Blog Titles</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>
                <Link to={`/users/${user.id}`} style={{ textDecoration: 'underline' }}>{user.username}</Link>
              </td>
              <td>{user.blogs.length}</td>
              <td>
                {user.blogs.length > 0 ? (
                  <ul style={{ marginBottom: 0 }}>
                    {user.blogs.map((blog) => (
                      <li key={blog.id}>{blog.title}</li>
                    ))}
                  </ul>
                ) : (
                  <span className="text-muted">No blogs created.</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  )
}

export default Users