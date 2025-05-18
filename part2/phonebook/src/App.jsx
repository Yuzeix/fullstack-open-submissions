import { useState } from 'react'
import Filter from './Components/Filter'
import Persons from './Components/Persons'
import PersonForm from './Components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([
      { name: 'Arto Hellas', number: '040-123456', id: 1 },
      { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
      { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
      { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 } 
  ]) 

  const [newName, setNewName] = useState('')

  const [newNumber, setNewNumber] = useState('')

  const [filterTerm, setFilterTerm] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
  setFilterTerm(event.target.value)
  }

  const personsToShow = filterTerm === ''
    ? persons
    : persons.filter(person => 
    person.name.toLowerCase().includes(filterTerm.toLowerCase())
  );   

  const addPerson = (event) => {
    event.preventDefault();

    const nameToCheck = newName.trim().toLowerCase();

    const isDuplicate = persons.some(person =>
      person.name.trim().toLowerCase() === nameToCheck);

    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length > 0 ? Math.max(...persons.map(p => p.id)) + 1 : 1
    }

    if (isDuplicate) {

      alert(`${newName} is already added to phonebook`);
      return;

    } else {

      setPersons(persons.concat(personObject))

      setNewName('');
      setNewNumber('')

    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterTerm={filterTerm} handleFilterChange={handleFilterChange}/>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow}/>
    </div>  
  )
}

export default App