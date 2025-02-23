const { test, after } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
//const Blog = require('../models/blog')
const { assert } = require('console')

const { strictEqual } = require('assert')

const api = supertest(app)

test('Blog API id instead of _id', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
    strictEqual(response.body[0].id !== undefined, true, 'id property is not defined')
    strictEqual(response.body[0].id, response.body[0]._id.toString(), 'id does not match _id')

})

after(async () => {
  await mongoose.connection.close()
})
