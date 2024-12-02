import { useState } from 'react'

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

const ListOfPeople = ({filteredPersons}) => {
  return (
    <>
    <h2>List of Persons</h2>
    <ul style={{ listStyleType: 'upper-roman' }}>
      {filteredPersons.map(person => (
        <li key={person.id}>{person.name} {person.number}</li>
      ))}
    </ul>
    </>
  )
}

const App = () => {
    const [persons, setPersons] = useState([
      { name: 'Jean Roque Raltique', number: '040-123456', id: 1 },
      { name: 'Nadia la Arwall', number: '39-44-5323523', id: 2 },
      { name: 'Grandis Granva', number: '12-43-234345', id: 3 },
      { name: 'Marie en Carlsberg', number: '39-23-6423122', id: 4 }
    ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName.trim(),
      number: newNumber.trim(),
      id: persons.length + 1,

    }
    if(personAlreadyExists()) {
      alert(`${newName} already exists in phonebook`)
    }
    else {
    setPersons(persons.concat(personObject))
    }
    setNewName('')
    setNewNumber('')
  }

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchTerm = (event) => {
    setSearchTerm(event.target.value)
  }

  const personAlreadyExists = () => {
    if(persons.some(person => person.name === newName)) {
      return true
    }
    return false
  }

  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Search searchTerm={searchTerm} handleSearchTerm={handleSearchTerm}/>
      <ListOfPeople filteredPersons={filteredPersons}/>
      <PersonForm addPerson={addPerson} newName={newName} handleNewName={handleNewName} newNumber={newNumber} handleNewNumber={handleNewNumber} />
    </div>
  )
}

export default App