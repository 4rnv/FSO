import { useEffect } from "react"
import { initializeUsers } from "../reducers/usersReducer"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"

const User = () => {
    const users = useSelector((state) => state.users)
    const id = useParams().id
    const user = users.find((u) => u.id === id)
    const dispatch = useDispatch()

    useEffect(() => {
        if (users.length === 0) {
            dispatch(initializeUsers())
        }
    }, [])

    if (!user) {
        return null
    }

    return (
        <>
            <h2>Blogs by {user.name}</h2>
            {user.blogs.length > 0 ?
                user.blogs.map((blog) => {
                    return <p key={blog.id}>{blog.title}</p>
                }) :
                <p>No blogs created.</p>
            }
        </>
    )
}

export default User