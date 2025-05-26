import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from '../reducers/blogReducer'

const BlogDetails = () => {
    const blogs = useSelector((state) => state.blogs)
    const id = useParams().id
    const blog = blogs.find((b) => b.id === id)
    const dispatch = useDispatch()

    useEffect(() => {
        if (blogs.length === 0) {
            dispatch(initializeBlogs())
        }
    }, [])


    if (!blog) {
        return null
    }

    return (
        <div>
            <h2>{blog.title}</h2>
            <p><strong>Author:</strong> {blog.author}</p>
            <p><strong>URL:</strong> <a href={blog.url}>{blog.url}</a></p>
            <p><strong>Likes:</strong> {blog.likes}</p>
            <p><strong>Posted by:</strong> {blog.user.name ? blog.user.name : 'Anonymous'}</p>
        </div>
    )
}

export default BlogDetails
