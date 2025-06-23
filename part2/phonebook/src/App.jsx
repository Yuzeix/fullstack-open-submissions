import { useState, useEffect } from "react";
import personsServices from "./Services/PersonsServices";
import Filter from "./Components/Filter";
import Persons from "./Components/Persons";
import PersonForm from "./Components/PersonForm";
import Notification from "./Components/Notification";
import "./index.css";

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState("");

  const [newNumber, setNewNumber] = useState("");

  const [filterTerm, setFilterTerm] = useState("");

  const [notificationMessage, setNotificationMessage] = useState(null);

  const [notificationType, setNotificationType] = useState("success");

  useEffect(() => {
    personsServices
      .getAll()
      .then((initialPersons) => {
        setPersons(initialPersons);
      })
      .catch((error) => {
        console.error("Failed to load initial people", error);
        showNotification(
          `Error loading data ${error.message || "Server unavailable"}`,
          "error"
        ); 
      });
  }, []);

  const showNotification = (message, type = "success") => {
    setNotificationMessage(message);
    setNotificationType(type);
    setTimeout(() => {
      setNotificationMessage(null);
    }, 5000);
  };

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
          showNotification(
            `${name} deleted.`,
            "success"
          );
        })
        .catch((error) => {
          showNotification(
            `Error deleting ${name}. They might have already been removed or a server error occurred.`,
            "error"
          );
          if (error.response && error.response.status === 404) {
            setPersons(persons.filter((p) => p.id !== id));
          }
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
            showNotification(
              `Updated ${returnedPerson.name} number successfully`,
              "success"
            );
          })
          .catch((error) => {
            if (error.response?.status === 404) {
              showNotification(
                `Information of ${isDuplicate.name} has already been removed from server`, 'error'
              );
              setPersons(persons.filter((p) => p.id !== isDuplicate.id));
            } else {
              const errorMsg =
                error.response?.data?.error ||
                `Could not update ${isDuplicate.name}.`;
              showNotification(errorMsg, "error");
            }
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
          showNotification(`Added ${returnedPerson.name}`, "success");
        })
        .catch((error) => {
          const errorMsg =
            error.response?.data?.error ||
            `Could not add ${personObject.name}.`;
          showNotification(errorMsg, "error");
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} type={notificationType} />
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
