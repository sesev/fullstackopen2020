import React, { useState } from 'react'


const Person = ({ person}) =>   
(
    <li>{person.name}</li>
  )
  



const App = () => {

  const [ persons, setPersons] = useState( [  { name: 'Arto Hellas' } ] ) 
  const [ newName, setNewName ] = useState('')
  
  const addName = (event) => {
    event.preventDefault()
    console.log(event)
    console.log(persons)
    console.log(setPersons)
    setNewName('')
     const alreadyPerson = persons.some((person) => person.name === newName) 
     if (alreadyPerson) {
       console.log('paskaa')
       alert(`${newName} is already added to phonebook`);
       return;
     }
    setPersons(persons.concat({name: newName}))

    }
    

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
    
  }



  return (
    <div>
      <h2>Phonebook</h2>
      <form  onSubmit={addName}>
      <div>
          name: <input value={newName} onChange={handleNameChange} />
          <button type="submit">add</button>
          </div>
          </form>
      <h2>Numbers</h2>
      <ul>{persons.map(person => <Person key={person.name} person={person} />)}</ul>
    </div>
  )

}

export default App