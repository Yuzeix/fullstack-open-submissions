const Persons = ({ personsToShow, handleRemovePerson }) => {
  return (
    <div>
      {personsToShow.map((person) => (
        <p key={person.id}>
          {person.name} : {person.number}{" "}
          <button onClick={() => handleRemovePerson(person.id, person.name)}>
            delete
          </button>
        </p>
      ))}
    </div>
  );
};

export default Persons;
