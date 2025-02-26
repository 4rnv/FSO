const { test, after } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const { assert } = require('console')

const { strictEqual } = require('assert')

const api = supertest(app)

const getToken = async () => {
    const user = {
      username: 'oriko',
      name: 'oriko',
      password: 'oriko'
    }
    await api.post('/api/users').send(user)
    const loginResponse = await api
      .post('/api/login')
      .send({ username: user.username, password: user.password })
    return loginResponse.body.token
}

test('POST request to /api/blogs with token', async () => {
    const token = await getToken()
    const initialBlogs = await Blog.find({})
    const initialCount = initialBlogs.length
    const newBlog = {
      title: 'Test Blog with token',
      author: 'Oriko Mikuni',
      url: 'http://ori.ko',
      likes: 21
    }
    
    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const updatedBlogs = await Blog.find({})
    const updatedCount = updatedBlogs.length
    strictEqual(updatedCount, initialCount + 1, 'The number of blogs should increase by one')
    const savedBlog = updatedBlogs.find(blog => blog.title === newBlog.title)
    strictEqual(savedBlog.title, newBlog.title, 'The title of the saved blog should match the new blog')
})

test('POST request to /api/blogs without token should return 401', async () => {
  const initialBlogs = await Blog.find({})
  const initialCount = initialBlogs.length
  const newBlog = {
    title: 'Test Blog without token',
    author: 'Oriko Mikuni',
    url: 'http://ori.ko',
    likes: 21
  }
  
  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401)
    .expect('Content-Type', /application\/json/)
  strictEqual(response.body.error, 'token missing', 'Error message should indicate that the token is missing')
})

after(async () => {
  await mongoose.connection.close()
})