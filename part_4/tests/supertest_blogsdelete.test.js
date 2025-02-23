const { test, after, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const { assert } = require('console')
const helper = require('../utils/list_helper')
const { strictEqual } = require('assert')

const api = supertest(app)

describe('Deletion of a blog', () => {
    test('Succeeds with status code 204 if id is valid', async () => {
        const blogId = '67bb36c423d89b85f6248226'
        await api
        .delete(`/api/blogs/${blogId}`)
        .expect(204)
    
        const response = await api.get('/api/blogs')
        const blogs = response.body
        const deletedBlog = blogs.find(blog => blog.id === blogId)
        strictEqual(deletedBlog, undefined, 'Deleted blog should not be found')  
    })
})

after(async () => {
  await mongoose.connection.close()
})