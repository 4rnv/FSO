const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const config = require('./utils/config')
const { connectToDatabase } = require('./controllers')
const blogRoutes = require('./routes/blogs')
const app = express()

app.use(cors())
app.use(express.json())

connectToDatabase()

app.use('/api/blogs', blogRoutes)

module.exports = app
