const { test, after } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const { assert } = require('console')

const { strictEqual } = require('assert')

const api = supertest(app)

test('POST request to /api/blogs', async () => {
    const initialBlogs = await Blog.find({})
    const initialCount = initialBlogs.length
    const newBlog = {
      title: 'Test Blog',
      author: 'Oriko Mikuni',
      url: 'http://ori.ko',
      likes: 2
    }
    
    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const updatedBlogs = await Blog.find({})
    const updatedCount = updatedBlogs.length
    strictEqual(updatedCount, initialCount + 1, 'The number of blogs should increase by one')
    const savedBlog = updatedBlogs.find(blog => blog.title === newBlog.title)
    strictEqual(savedBlog.title, newBlog.title, 'The title of the saved blog should match the new blog')
})

after(async () => {
  await mongoose.connection.close()
})