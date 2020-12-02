import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import { Persons, PersonForm, Filter} from "./components/PersonsHandling";
import Notification from "./components/Notification"



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
  const [successMessage, setSuccessMessage] = useState(null)

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
            setSuccessMessage(`'${name}' was deleted succesfully.`) 
            setTimeout(() => { setSuccessMessage(null) }, 5000)
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
      return
    }
    const alreadyPerson = persons.some((person) => person.name.toUpperCase() === newName.toUpperCase())
    
    if (alreadyPerson) {
      if (window.confirm(`Update ${newName} from phonebook?`)) {
        const updatePerson = persons.find(p => p.name.toUpperCase() === newName.toUpperCase()) 
        const updateNumber = {...updatePerson, number: newNumber}
        personService
         .update(updatePerson.id, updateNumber)
         .catch(error => {
          setErrorMessage(`Information of ${updatePerson.name} was already deleted from the server prior to editing.`) 
          setTimeout(() => { setErrorMessage(null) }, 5000)
          refreshList()
          return
        })
        .then(() => {  
          setSuccessMessage(`Information of ${updatePerson.name} has been updated successfully.`) 
          setTimeout(() => { setSuccessMessage(null) }, 5000) 
        refreshList()
        })
      }}
    else {

     personService
     .create(newPersona)
     .then(response => {
      refreshList()
      setPersons(persons.concat({ name: newName, number: newNumber }))
      refreshList()
     })
      setSuccessMessage(`${newName} has been added to the contact list succesfully.`) 
      setTimeout(() => { setSuccessMessage(null) }, 5000)
    }
  }

  return (
    <div>
      <Notification errorMsg={errorMessage} successMsg={successMessage} />
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