const express = require('express')
const app = express()
const { Blog } = require('../controllers')

app.get('/', (request, response) => {
  Blog.find({})
    .then(blogs => {
      response.json(blogs)
    })
})

app.post('/', (request, response) => {
  const { title, author, url, likes } = request.body
  if (!title || !url) {
    return response.status(400).json({ error: 'Title and URL are required' })
  }

  const blog = new Blog({
    title : title,
    author : author,
    url : url,
    likes: likes
  })

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

app.delete('/:id', async (request, response) => {
  const { id } = request.params
  
  try {
    const deletedBlog = await Blog.findByIdAndDelete(id)
    response.status(204).end()
  } catch (error) {
    response.status(500).json({ error: 'Failed to delete blog' })
  }
})

app.put('/:id', async (request, response) => {
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

module.exports = app
