import { useState, useEffect } from 'react'
import axios from 'axios'
import connect from './services/connect'

const PersonForm = ({addPerson, newName, handleNewName, newNumber, handleNewNumber}) => {
  return (
    <>
    <h2>Add New Person</h2>
    <form onSubmit={addPerson}>
      <div>name: <input type="text" placeholder={newName} value={newName} onChange={handleNewName} required /></div>
      <div>number: <input type="tel" placeholder={newNumber} value={newNumber} onChange={handleNewNumber} required /></div>
      <div><button type="submit">add</button></div>
    </form>
    </>
  )
}

const Search = ({searchTerm, handleSearchTerm}) => {
  return (<input type="text" placeholder='Search' value={searchTerm} onChange={handleSearchTerm}/>)
}

const ListOfPeople = ({filteredPersons, handleDelete}) => {
  return (
    <>
    <h2>List of Persons</h2>
    <ul style={{ listStyleType: 'upper-roman' }}>
      {filteredPersons.map(person => (
        <li key={person.id}>{person.name} {person.number}<button onClick={() => handleDelete(person)}>Delete</button></li>
      ))}
    </ul>
    </>
  )
}

const App = () => {
    const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    connect.getAll().then(response => {
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName.trim(),
      number: newNumber.trim(),
      id: String(persons.length + 1),

    }
    const existingPerson = persons.find(person => person.name === personObject.name)

    if(existingPerson) {
      if(window.confirm(`${personObject.name} already exists in phonebook, would you like to replace their number?`)) {
        connect.update(existingPerson.id, { ...existingPerson, number: personObject.number })
        .then(response => {
          setPersons(persons.map(person => person.id === existingPerson.id ? response.data : person));
        })
        .catch(error => {
          console.error("Error updating person:", error);
        });
    }
  }
    else {
      setPersons(persons.concat(personObject))
      connect.create(personObject)
      .then(response => {
        setNotes(persons.concat(response.data))
      })
    }
    setNewName('')
    setNewNumber('')
  }

  const handleNewName = (event) => {
    setNewName(event.target.value.trim())
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value.trim())
  }

  const handleSearchTerm = (event) => {
    setSearchTerm(event.target.value.trim())
  }

  const handleDelete = (person) => {
    let id = person.id
    console.log("Deleting person with ID:", id)
    if (window.confirm(`Are you sure you want to delete ${person.name}`)) {
      connect.eliminate(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
          console.error("Error deleting person:", error)
        })
    }
  }
  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Search searchTerm={searchTerm} handleSearchTerm={handleSearchTerm}/>
      <ListOfPeople filteredPersons={filteredPersons} handleDelete={handleDelete}/>
      <PersonForm addPerson={addPerson} newName={newName} handleNewName={handleNewName} newNumber={newNumber} handleNewNumber={handleNewNumber}/>
    </div>
  )
}

export default App