import { useState, useEffect } from "react";
import PersonsServices from "./Services/PersonsServices";
import Filter from "./Components/Filter";
import Persons from "./Components/Persons";
import PersonForm from "./Components/PersonForm";

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState("");

  const [newNumber, setNewNumber] = useState("");

  const [filterTerm, setFilterTerm] = useState("");

  useEffect(() => {
    PersonsServices
    .getAll()
    .then((initialPersons) => {
      setPersons(initialPersons);
      })
    .catch((error) => {
      alert("Failed to retrieve data from the service.");
    });
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterTerm(event.target.value);
  };

  const handleRemovePerson = ( id, name ) => {
    if (window.confirm(`Delete ${name} ?`)) {
      PersonsServices
      .removePerson(id)
      .then(() => {
        setPersons(persons.filter(p => p.id !== id));
    })
      .catch(error => {
      alert (`The Person '${name}' was already deleted from server.`);
      setPersons(persons.filter(p => p.id !== id));
    });  
  } else {
    console.log(`Deletion canceled by the user for id: ${id}`);
  }};

  const personsToShow =
    filterTerm === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(filterTerm.toLowerCase())
        );

  const addPerson = (event) => {
    event.preventDefault();

    const nameToCheck = newName.trim().toLowerCase();

    const isDuplicate = persons.some(
      (person) => person.name.trim().toLowerCase() === nameToCheck
    );

    if (isDuplicate) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    const personObject = {
      name: newName,
      number: newNumber,
    };

    PersonsServices.create(personObject)
      .then((newPerson) => {
        setPersons(persons.concat(newPerson));

        setNewName("");
        setNewNumber("");
      })
      .catch((error) => {
        alert(
          "Failed to load initial data from the server. Ensure json-server is running on port 3004."
        );
      });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterTerm={filterTerm} handleFilterChange={handleFilterChange} />
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} handleRemovePerson={handleRemovePerson}/>
    </div>
  );
};

export default App;
