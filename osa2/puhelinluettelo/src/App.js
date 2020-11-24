import React, { useState } from 'react'


const Person = ({ person}) =>  
(<li>{person.name} {person.number}</li>)
 
const PersonForm =   ({ addName, handleNameChange, newName, handleNewNumber, newNumber,}) => {
 
 return (<form  onSubmit={addName}>
      <div> name: <input value={newName} onChange={handleNameChange} />
      <div> number: <input value={newNumber} onChange={handleNewNumber} /></div>
      <button type="submit">add</button>
      </div>
      </form>)
      }
  
const Persons = ({persons, newFilter}) => {

const filteredPersons = persons.filter(person => person.name.toUpperCase().includes(newFilter.toUpperCase()))
return (
<div>
    {filteredPersons.map(person => <Person key ={person.name} person={person} />)}
</div>)

}

const Filter = ({setNewFilter, handleFilterChange}) => {
  return (
    <div>Filter shown with: <input value={setNewFilter} onChange={handleFilterChange} /></div>
  )
}

const App = () => {

    const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
 
 

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
  

  const addName = (event) => {
    
    event.preventDefault()

    setNewName('')
    setNewNumber('')

     const alreadyPerson = persons.some((person) => person.name.toUpperCase() === newName.toUpperCase()) 
     if (alreadyPerson) {
       alert(`${newName} is already added to phonebook`)}

      if (newName.length === 0) {
        alert('You have add a name!')
        return;
      }
      if (newNumber.length === 0) {
        alert('You have to add a phonenumber!')
      }
       setPersons(persons.concat({name: newName, number: newNumber}))
     }
    
  return (
    <div>
      
      <h2>Phonebook</h2>
      <div></div>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h2>Add a new name:</h2>
      <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNewNumber={handleNewNumber} />
      <h2>Numbers</h2>
      <ul><Persons persons={persons} newFilter={newFilter} /></ul>
      
      
    </div>
  )

}

export default App