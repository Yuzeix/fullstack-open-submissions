import { useState } from 'react'

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
      <div>
        filter shown with<input value={filterTerm} onChange={handleFilterChange}/>
      </div>
      <form onSubmit={addPerson} >
        <h2>add a new</h2>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {personsToShow.map(person =>  
          <p key={person.id}>{person.name} : {person.number} </p> 
      )}
    </div>  
  )
}

export default App