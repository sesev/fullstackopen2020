import React, { useState, useEffect } from 'react'
import personService from './services/persons'


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

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )
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
  const [errorMessage, setErrorMessage] = useState(null)

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
            refreshList()
              console.log('person deleted')
          })
          .catch(error => {
  
              setErrorMessage(`'${name}' was already deleted!`) 
              setTimeout(() => { setErrorMessage(null) }, 5000)
              refreshList()
                      })

  }
}

  const refreshList = ()  => {
    personService
      .getAll()
      .then(response => {
        console.log('lista päivitetty lisäyksen/poiston/päivityksen')
        setPersons(response.data)
      })
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
      setErrorMessage(`You have to add a name!`) 
      setTimeout(() => { setErrorMessage(null) }, 5000)
      return;
    }
    if (newNumber.length === 0) {
      setErrorMessage(`You have to add a phonenumber!`) 
      setTimeout(() => { setErrorMessage(null) }, 5000)
    }
    const alreadyPerson = persons.some((person) => person.name.toUpperCase() === newName.toUpperCase())
    
    if (alreadyPerson) {
      if (window.confirm(`Update ${newName} from phonebook?`)) {
        const updatePerson = persons.find(p => p.name.toUpperCase() === newName.toUpperCase()) 
        const updateNumber = {...updatePerson, number: newNumber}
        personService
        .update(updatePerson.id, updateNumber)
         .catch(error => {
          setErrorMessage(`'${updatePerson.name}' was already deleted!`) 
          setTimeout(() => { setErrorMessage(null) }, 5000)
          refreshList()
        })
        .then(() => {
        setErrorMessage(`'${updatePerson.name}' phonenumber was updated.`) 
        setTimeout(() => { setErrorMessage(null) }, 5000)
       
        refreshList()
        })
      }}
    else {

     personService
     .create(newPersona)
     .then(response => {
      setPersons(persons.concat({ name: newName, number: newNumber }))
      refreshList()
     })
      setErrorMessage(`'${newName}' added to the contact list.`) 
      setTimeout(() => { setErrorMessage(null) }, 5000)
    }
  }

  return (
    <div>
      <Notification message={errorMessage} />

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