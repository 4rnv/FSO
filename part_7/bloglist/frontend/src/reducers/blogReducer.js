import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        setBlogs(state, action) {
            return action.payload
        },
        appendBlog(state, action) {
            state.push(action.payload)
        },
        updateBlog(state, action) {
            const updatedBlog = action.payload
            return state.map((blog) =>
                blog.id !== updatedBlog.id ? blog : updatedBlog
            )
        },
        removeBlog(state, action) {
            const id = action.payload
            return state.filter((blog) => blog.id !== id)
        },
    },
})

export const { setBlogs, appendBlog, updateBlog, removeBlog } =
    blogSlice.actions

export const initializeBlogs = () => {
    return async (dispatch) => {
        const blogs = await blogService.getAll()
        dispatch(setBlogs(blogs))
    }
}

export const createBlog = (content, headers) => {
    return async (dispatch) => {
        const newBlog = await blogService.createBlog(content, headers)
        dispatch(appendBlog(newBlog))
    }
}


export const likeBlog = (blogObject) => {
    return async (dispatch) => {
        const changedBlog = {
            ...blogObject,
            likes: blogObject.likes + 1,
        }
        const response = await blogService.updateBlog(blogObject.id, changedBlog)
        if (typeof response.user === 'string') {
            response.user = blogObject.user
        }
        dispatch(updateBlog(response))
    }
}

export const deleteBlogFromServer = (id, token) => {
    return async (dispatch) => {
        const headers = {
            Authorization: `Bearer ${token}`
        }
        await blogService.deleteBlog(id, headers)
        dispatch(removeBlog(id))
    }
}

export default blogSlice.reducer