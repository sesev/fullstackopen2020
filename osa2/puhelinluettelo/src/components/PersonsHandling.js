
import React from 'react';
import '../index.css';

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

  export {Persons, Filter, Person, PersonForm}
