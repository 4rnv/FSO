const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const path = require('path')
require('dotenv').config()
const mongoose = require('mongoose')
const Person = require('./models/person')
const { error } = require('console')
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static('dist'))
morgan.token('post', (req) => {return JSON.stringify(req.body)}) // 'post' is the name of the token
app.use(morgan(':method :url :status :res[content-length] - :response-time :post'))
app.set('views', path.join(__dirname, 'dist'))

app.get('/', (req, res) => {res.render('index')})

app.get('/info', (req, res) => {
    const time = new Date().toLocaleString()
    data = []
    Person.find({}).then(persons => {
      res.send(`<strong>Phonebook has info for ${persons.length} people</strong><br><p>Request received at time ${time}</p>`)
    })
})

app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
        res.json(persons)
      })
})

app.get('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id).then(person => {
      if (person) {
        res.json(person)
      } else {
        res.status(404).end()
      }
    })
    // .catch(error => {
    //  console.log(error)
    //  res.status(400).send({ error: 'malformatted id' })
    // })
    .catch(error => next(error))
  })

app.delete('/api/persons/:id', async (req, res) => {
  try {
    const result = await Person.findByIdAndDelete(req.params.id)
    if (result) {
      res.status(204).end()
    } 
    else {
      res.status(404).json({ error: `Person with ID ${req.params.id} doesn't exist` })
    }
  } catch (error) {res.status(400).send('Invalid ID')}
})

app.post('/api/persons', (req, res) => {
    const { name, number } = req.body

    if (!name || !number) {
        return res.status(400).json({ error: 'Name or number is missing' })
    }

    const person = new Person({
        name: name,
        number: number,
      })
    
    person.save().then(savedPerson => {
        res.json(savedPerson)
      })

    // const existingPerson = data.find(person => person.name === name)
    // if (existingPerson) {
    //     return res.status(400).json({ error: 'Name must be unique' })
    // }

    // const newId = Math.floor(Math.random()*100000)
    // while(data.find(person => person.id === newId)) {
    //     const newId = Math.floor(Math.random()*100000)
    // }
    // const newPerson = { id: String(newId), name, number }
    // data.push(newPerson)
    // res.status(201).json(newPerson)
})

app.put('/api/persons/:id', (req, res, next) => {
  const { name, number } = req.body

  if (!name || !number) {
      return res.status(400).json({ error: 'Name or number is missing' })
  }

  Person.findByIdAndUpdate(req.params.id, { name, number }, { new: true})
      .then(updatedPerson => {
          if (updatedPerson) {
              res.json(updatedPerson)
          } else {
              res.status(404).json({ error: `Person with ID ${req.params.id} doesn't exist` })
          }
      })
      .catch(error => next(error))
})


const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
// handler of requests with unknown endpoint
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  next(error)
}
// this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
