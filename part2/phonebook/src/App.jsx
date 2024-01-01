// App.js
import { useState, useEffect } from "react";
import { Filter } from "./components/Filter";
import { Persons } from "./components/Persons";
import { PersonForm } from "./components/PersonForm";
import { Alert } from "./components/Alert";
import { Title } from "./components/Title";
import service from "./services/persons.js";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchName, setSearchName] = useState("");
  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    console.log("effect");
    service.getAll().then((data) => {
      if (Array.isArray(data)) {
        setPersons(data);
      }
    });
  }, []);

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();

    const newPerson = {
      name: newName,
      number: newNumber,
    };

    const match = persons.find(
      (person) => person.name.toUpperCase() === newName.toUpperCase()
    );

    if (match) {
      const confirmMessage = `${newName} is already added to the phonebook. Replace the old number with a new one?`;

      if (window.confirm(confirmMessage)) {
        service
          .update(match.id, newPerson)
          .then(() => {
            service.getAll().then((data) => setPersons(data));
            setMessage(`Updated ${newName}'s number`);
            setTimeout(() => setMessage(null), 3000);
            setNewName("");
            setNewNumber("");
          })
          .catch((error) => {
            setErrorMessage(error.response.data.error);
            setTimeout(() => setErrorMessage(null), 3000);
          });
      }
    } else {
      service
        .create(newPerson)
        .then(() => {
          service.getAll().then((data) => setPersons(data));
          setNewName("");
          setNewNumber("");
          setMessage(`Added ${newName}`);
          setTimeout(() => setMessage(null), 3000);
        })
        .catch((error) => {
          setErrorMessage(error.response.data.error);
          setTimeout(() => setErrorMessage(null), 3000);
        });
    }
  };

  return (
    <div>
      <Title name={"Phonebook"} />
      {message && <Alert message={message} />}
      {errorMessage && <Alert message={errorMessage} error={true} />}
      <div>
        <Filter searchName={searchName} setSearchName={setSearchName} />
      </div>

      <div>
        <Title name={"Add a new"} />
        <PersonForm
          handleSubmitForm={handleSubmitForm}
          newName={newName}
          setNewName={setNewName}
          newNumber={newNumber}
          setNewNumber={setNewNumber}
          handleNameChange={handleNameChange}
          handleNumberChange={handleNumberChange}
        />
      </div>

      <div>
        <Title name={"Numbers"} />
        <Persons
          persons={persons}
          searchName={searchName}
          setPersons={setPersons}
          setErrorMessage={setErrorMessage}
        />
      </div>
    </div>
  );
};

export default App;
