import { useState, useEffect } from "react";
import { Filter } from "./components/Filter";
import { Persons } from "./components/Persons";
import { PersonForm } from "./components/PersonForm";
import { Alert } from "./components/Alert";
import service from "./services/notes";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [number, setNumber] = useState("");
  const [searchName, setSearchName] = useState("");
  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    console.log("effect");
    service.getAll().then((data) => setPersons(data));
  }, []);

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNumber(e.target.value);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();

    const nameExists = persons.some((person) => person.name === newName);
    const newObject = {
      name: newName,
      number: number,
    };

    if (nameExists) {
      const message = `${newName} is already added to phonebook, replace the old number with a new one?`;
      if (window.confirm(message)) {
        service
          .update(nameExists.id, newObject)
          .then(() => {
            service.getAll().then((data) => setPersons(data));
            setMessage(`Added ${newName}`);
            setMessage(null);
          })
          .catch((error) => {
            setErrorMessage(error.response.data.error);
            setErrorMessage(null);
          });
      }
    } else {
      service
        .create(newObject)
        .then(() => {
          service.getAll().then((data) => setPersons(data));
          setNewName("");
          setMessage(`Added ${newName}`);
          setMessage(null);
        })
        .catch((error) => {
          setErrorMessage(error.response.data.error);
          setErrorMessage(null);
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      {message && <Alert message={message} />}
      {errorMessage && <Alert message={errorMessage} error={true} />}
      <Filter searchName={searchName} setSearchName={setSearchName} />
      <PersonForm
        handleSubmitForm={handleSubmitForm}
        newName={newName}
        setNewName={setNewName}
        number={number}
        setNumber={setNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        searchName={searchName}
        setPersons={setPersons}
      />
    </div>
  );
};

export default App;
