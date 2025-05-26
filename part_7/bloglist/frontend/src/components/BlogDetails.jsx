import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs, updateBlog } from '../reducers/blogReducer'
import { setComment } from '../reducers/commentReducer'
import blogService from '../services/blogs'
import { clearNotification, setNotification } from '../reducers/notificationReducer'
import { Container, Form, Button } from 'react-bootstrap'

const BlogDetails = () => {
    const blogs = useSelector((state) => state.blogs)
    const user = useSelector((state) => state.user)
    const comment = useSelector((state) => state.comment)
    const id = useParams().id
    const blog = blogs.find((b) => b.id === id)
    const dispatch = useDispatch()

    useEffect(() => {
        if (blogs.length === 0) {
            dispatch(initializeBlogs())
        }
    }, [])

    const handleNewComment = async (e) => {
        e.preventDefault()
        const newComment = comment
        const headers = {
            'Authorization': `Bearer ${user.token}`
        }
        try {
            const blogWithAddedComment = await blogService.addComment(newComment, blog.id, headers)
            dispatch(updateBlog(blogWithAddedComment))
            dispatch(setComment(''))
            dispatch(setNotification({ message: `Comment on blog ${blog.title} added`, type: 'success' }))
        } catch (error) {
            dispatch(setNotification({ message: 'Error adding comment', type: 'error' }))
        }
        setTimeout(() => dispatch(clearNotification()), 5000)
    }


    if (!blog) {
        return null
    }

    return (
        <Container className="pt-4" style={{ fontSize: '1.2rem' }}>
            <h1>{blog.title}</h1>
            <p><strong>Author:</strong> {blog.author}</p>
            <p>
                <strong>URL:</strong>{' '}
                <a href={blog.url} style={{ textDecoration: 'underline' }}>
                    {blog.url}
                </a>
            </p>
            <p><strong>Likes:</strong> {blog.likes}</p>
            <p><strong>Posted by:</strong> {blog.user.name || 'Anonymous'}</p>

            <Form className="my-4" onSubmit={(e) => { handleNewComment() }}>
                <Form.Group controlId="comment">
                    <Form.Label>Add a comment</Form.Label>
                    <Form.Control
                        type="text"
                        value={comment}
                        onChange={(e) => dispatch(setComment(e.target.value))}
                        style={{ fontSize: '1rem', background: '#eee', border: 'none', borderRadius: 0 }}
                    />
                </Form.Group>
                <Button variant="dark" className="mt-2" style={{ fontSize: '1rem', borderRadius: 0 }} onClick={handleNewComment}>
                    Add Comment
                </Button>
            </Form>

            <h3 className="mt-5">Comments</h3>

            {blog.comments.length > 0
                ? blog.comments.map((comment) => <p>{comment}</p>)
                : <p className="text-muted">No comments yet.</p>}
        </Container>
    )
}

export default BlogDetails
