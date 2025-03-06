const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')

// const getTokenFrom = request => {
//   const authorization = request.get('authorization')
//   if (authorization && authorization.startsWith('Bearer ')) {
//     return authorization.replace('Bearer ', '')
//   }
//   return null
// }

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user')
  response.json(blogs)
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const { title, author, url, likes } = request.body
  if (!title || !url) {
    return response.status(400).json({ error: 'Title and URL are required' })
  }
  //const decodedToken = jwt.verify(getTokenFrom(request), process.env.SEKRIT)
  // const decodedToken = jwt.verify(request.token, process.env.SEKRIT)
  // if (!decodedToken.id) {
  //   return response.status(401).json({ error: 'token invalid' })
  // }
  const user = request.user
  //const user = await User.findById(decodedToken.id)
  //const randUser = await User.findOne()
  const blog = new Blog({
    title : title,
    author : author,
    url : url,
    likes: likes,
    user: user.id
  })
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  const { id } = request.params
  // if (!request.token) {
  //   return response.status(401).json({ error: 'token missing' })
  // }
  // const decodedToken = jwt.verify(request.token, process.env.SEKRIT)
  // if (!decodedToken.id) {
  //   return response.status(401).json({ error: 'token invalid' })
  // }
  const user = request.user
  const blog = await Blog.findById(id)
  if (!blog) {
    return response.status(404).json({ error: 'blog not found' })
  }
  if (blog.user.toString() !== user.id.toString()) {
    return response.status(403).json({ error: 'Only the creator of a blog can delete it' })
  }
  try {
    await Blog.findByIdAndDelete(id)
    response.status(204).end()
  } catch (error) {
    response.status(500).json({ error: 'Failed to delete blog' })
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const {likes} = request.body
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, { likes: likes }, { new: true, runValidators: true })
    if (updatedBlog) {
      response.status(200).json(updatedBlog)
    }
    else {
      response.status(404).json({ error: `Blog with ID ${request.params.id} doesn't exist` })
    }
  } catch(error) {
    response.status(500).json({ error: 'Failed to delete blog' })
  }
})

blogsRouter.post('/reset', async (request, response) => {
  await Blog.deleteMany({})

  response.status(204).end()
})

module.exports = blogsRouter