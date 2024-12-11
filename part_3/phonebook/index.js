const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const path = require('path')
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static('dist'))
morgan.token('post', (req) => { // 'post' is the name of the token
    return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time :post'))
app.set('views', path.join(__dirname, 'dist'))
let data = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (req, res) => {res.render('index')})

app.get('/info', (req, res) => {
    const time = new Date().toLocaleString()
    res.send(`<strong>Phonebook has info for ${data.length} people</strong><br><p>Request received at time ${time}</p>`)
})

app.get('/api/persons', (req, res) => {
    res.json(data)
})

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id
    const person = data.find(person => person.id === id)
    if (person) {
        res.json(person)
    } else {
        res.status(404).send('Not found')
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    const personExists = data.some(person => person.id === id)
    if (!personExists) {
        return res.status(404).json({ error: `Person with that ID doesn't exist` })
    }
    data = data.filter(person => person.id !== id)
    res.status(204).end()
})

app.post('/api/persons', (req, res) => {
    const { name, number } = req.body

    if (!name || !number) {
        return res.status(400).json({ error: 'Name or number is missing' })
    }

    const existingPerson = data.find(person => person.name === name)
    if (existingPerson) {
        return res.status(400).json({ error: 'Name must be unique' })
    }

    const newId = Math.floor(Math.random()*100000)
    while(data.find(person => person.id === newId)) {
        const newId = Math.floor(Math.random()*100000)
    }
    const newPerson = { id: String(newId), name, number }
    data.push(newPerson)

    res.status(201).json(newPerson)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
