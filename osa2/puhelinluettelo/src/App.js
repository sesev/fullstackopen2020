import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import axios from 'axios'


const Person = ({ person, handleRemoveName }) => 
  
  (<ul><li>{person.name} {person.number}<button onClick={(event) => {event.preventDefault(); handleRemoveName(person.id, person.name)}}>delete</button></li></ul>
  )
  

const PersonForm = ({ addName, handleNameChange, newName, handleNewNumber, newNumber, }) => {

  return (<form onSubmit={addName}>
    <div> name: <input value={newName} onChange={handleNameChange} />
      <div> number: <input value={newNumber} onChange={handleNewNumber} /></div>
      <button type="submit">add</button>
    </div>
  </form>)
}

const Persons = ({filteredPersons, handleRemoveName }) => {

  return (
    <div>
      {filteredPersons.map(person => <Person key={person.name} person={person} handleRemoveName={handleRemoveName} />)}
    </div>)

}


const Filter = ({ setNewFilter, handleFilterChange }) => {
  return (
    <div>Filter shown with: <input value={setNewFilter} onChange={handleFilterChange} /></div>
  )
}

const App = () => {

  const [persons, setPersons] = useState([])

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

 const handleRemoveName = (id, name) => {
  if (window.confirm(`Delete ${name} from phonebook?`)) {
      personService
          .deletePerson(id)
          .then(() => {
            setPersons(persons.filter((person) => person.id !== id))
              console.log('person deleted')
          })

  }
}




  const filteredPersons = persons.filter(person => person.name.toUpperCase().includes(newFilter.toUpperCase()))


  const addName = (event) => {



    event.preventDefault()
    const newPersona = {
      name: newName,
      number: newNumber,
    }
        
    setNewName('')
    setNewNumber('')
    if (newName.length === 0) {
      alert('You have add a name!')
      return;
    }
    if (newNumber.length === 0) {
      alert('You have to add a phonenumber!')
    }
    const alreadyPerson = persons.some((person) => person.name.toUpperCase() === newName.toUpperCase())
    if (alreadyPerson) {
      alert(`${newName} is already added to phonebook`)
    }
    else {

     personService
     .create(newPersona)
     .then(response => {
      setPersons(persons.concat({ name: newName, number: newNumber }))
     })
      alert(`${newName} added to the contact list`)
    }
  }

  return (
    <div>

      <h2>Phonebook</h2>
      <div></div>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h2>Add a new name:</h2>
      <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNewNumber={handleNewNumber} />
      <h2>Numbers</h2>
      <Persons persons={persons} newFilter={newFilter} filteredPersons={filteredPersons} handleRemoveName={handleRemoveName}/>


    </div>
  )

}

export default App