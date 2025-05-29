import { useState, useEffect } from "react";
import personsServices from "./Services/PersonsServices";
import Filter from "./Components/Filter";
import Persons from "./Components/Persons";
import PersonForm from "./Components/PersonForm";
import Notification from "./Components/Notification";
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState("");

  const [newNumber, setNewNumber] = useState("");

  const [filterTerm, setFilterTerm] = useState("");

  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    personsServices
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

  const handleRemovePerson = (id, name) => {
    if (window.confirm(`Delete ${name} ?`)) {
      personsServices
        .removePerson(id)
        .then(() => {
          setPersons(persons.filter((p) => p.id !== id));
          setSuccessMessage(`${name} has already been successfully deleted.`);
            setTimeout(() => {
              setSuccessMessage(null);
            }, 5000);
        })
        .catch((error) => {
          alert(`The Person '${name}' was already deleted from server.`);
          setPersons(persons.filter((p) => p.id !== id));
        });
    } else {
      console.log(`Deletion canceled by the user for id: ${id}`);
    }
  };

  const personsToShow =
    filterTerm === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(filterTerm.toLowerCase())
        );

  const addPerson = (event) => {
    event.preventDefault();

    const nameToCheck = newName.trim().toLowerCase();

    const isDuplicate = persons.find(
      (person) => person.name.trim().toLowerCase() === nameToCheck
    );

    if (isDuplicate) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const updatedPerson = { ...isDuplicate, number: newNumber };

        personsServices
          .updateNumber(isDuplicate.id, updatedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((p) => (p.id !== isDuplicate.id ? p : returnedPerson))
            );
            setNewName("");
            setNewNumber("");
            setSuccessMessage(`Updated ${returnedPerson.name} number successfully`);
            setTimeout(() => {
              setSuccessMessage(null);
            }, 5000);
          })
          .catch((error) => {
            alert(
              `Error updating ${isDuplicate.name} could not update person. They might have been removed or server error.`
            );
          });
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      };

      personsServices
        .create(personObject)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setNewName("");
          setNewNumber("");
          setSuccessMessage(`Added ${returnedPerson.name}`);
            setTimeout(() => {
              setSuccessMessage(null);
            }, 5000);
        })
        .catch((error) => {
          alert(
            `Failed to load initial data from the server. Ensure json-server is running on port 3004.`
          );
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification successMessage={successMessage}/>
      <Filter filterTerm={filterTerm} handleFilterChange={handleFilterChange} />
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons
        personsToShow={personsToShow}
        handleRemovePerson={handleRemovePerson}
      />
    </div>
  );
};

export default App;
