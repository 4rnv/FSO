const { test, after, describe, before } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const { assert } = require('console')

const { strictEqual } = require('assert')

const api = supertest(app)

test('Succeeds with status 200, returns updated JSON if valid', async () => {
    const blogId = '67bb3671c40c84ab7fe0d571'
    const updatedLikes = 11
    await api
    .put(`/api/blogs/${blogId}`)
    .send({ likes: updatedLikes })
    .expect(200)

    const response = await api.get('/api/blogs')
    const blogs = response.body
    const updatedBlog = blogs.find(blog => blog.id === blogId)
    strictEqual(updatedBlog.likes, updatedLikes, 'Likes are not equal')  
})

after(async () => {
    await mongoose.connection.close()
})